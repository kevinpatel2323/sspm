import * as aws from "@pulumi/aws";

export function createEcr() {
  // ECR for API Gateway
  const apiGatewayRepo = new aws.ecr.Repository("api-gateway-repo", {
    forceDelete: true,
    tags: { Project: "sspm", Service: "api-gateway" },
  });

  // ECR for User Service
  const userServiceRepo = new aws.ecr.Repository("user-service-repo", {
    forceDelete: true,
    tags: { Project: "sspm", Service: "user-service" },
  });

  return { apiGatewayRepo, userServiceRepo };
} 