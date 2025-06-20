import * as awsx from "@pulumi/awsx";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export function createEcs({ network, ecr, databases, ssm }: any) {
  // ECS Cluster
  const cluster = new aws.ecs.Cluster("sspm-cluster", {});

  // ALB in public subnets
  const alb = new awsx.lb.ApplicationLoadBalancer("sspm-alb", {
    subnetIds: network.publicSubnets,
    securityGroups: [network.vpc.vpc.defaultSecurityGroupId],
    tags: { Project: "sspm" },
    listener: { port: 80 },
  });

  // Common network configuration for Fargate services
  const networkConfiguration = {
    subnets: network.privateSubnets,
    securityGroups: [network.vpc.vpc.defaultSecurityGroupId],
    assignPublicIp: false,
  };

  // API Gateway Fargate Service (with ALB)
  const apiGatewayService = new awsx.ecs.FargateService("api-gateway-service", {
    cluster: cluster.arn,
    desiredCount: 2,
    networkConfiguration,
    taskDefinitionArgs: {
      container: {
        name: "api-gateway",
        image: ecr.apiGatewayRepo.repositoryUrl,
        cpu: 256,
        memory: 512,
        essential: true,
        portMappings: [{ containerPort: 3000 }], // Only containerPort
        environment: [
          { name: "NODE_ENV", value: "production" },
          { name: "DATABASE_URL", value: ssm.rdsConn.value },
          { name: "DOCDB_URL", value: ssm.docdbConn.value },
        ],
      },
    },
    loadBalancers: [{
      targetGroupArn: alb.defaultTargetGroup.arn,
      containerName: "api-gateway",
      containerPort: 3000,
    }],
    tags: { Project: "sspm", Service: "api-gateway" },
  });

  // User Service Fargate Service (no ALB)
  const userService = new awsx.ecs.FargateService("user-service", {
    cluster: cluster.arn,
    desiredCount: 2,
    networkConfiguration,
    taskDefinitionArgs: {
      container: {
        name: "user-service",
        image: ecr.userServiceRepo.repositoryUrl,
        cpu: 256,
        memory: 512,
        essential: true,
        portMappings: [{ containerPort: 3001 }], // No ALB/targetGroup
        environment: [
          { name: "NODE_ENV", value: "production" },
          { name: "DATABASE_URL", value: ssm.rdsConn.value },
          { name: "DOCDB_URL", value: ssm.docdbConn.value },
        ],
      },
    },
    tags: { Project: "sspm", Service: "user-service" },
  });

  return { cluster, alb, apiGatewayService, userService };
} 