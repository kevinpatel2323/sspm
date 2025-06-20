import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export function createDatabases(network: { vpc: any; privateSubnets: pulumi.Output<string[]> }) {
  // Generate random passwords
  const rdsPassword = new aws.secretsmanager.Secret("rds-password", {
    description: "RDS master password for SSPM",
  });
  const rdsPasswordValue = new aws.secretsmanager.SecretVersion("rds-password-value", {
    secretId: rdsPassword.id,
    secretString: pulumi.secret("${randomPassword123!}") // Replace with a secure random generator in production
  });

  // RDS PostgreSQL
  const rds = new aws.rds.Instance("sspm-postgres", {
    engine: "postgres",
    engineVersion: "15",
    instanceClass: "db.t3.micro",
    allocatedStorage: 20,
    dbName: "sspm_central_db",
    username: "postgres",
    password: pulumi.interpolate`${rdsPasswordValue.secretString}`,
    vpcSecurityGroupIds: [network.vpc.vpc.defaultSecurityGroupId],
    dbSubnetGroupName: new aws.rds.SubnetGroup("sspm-rds-subnet-group", {
      subnetIds: network.privateSubnets,
      tags: { Project: "sspm" },
    }).name,
    skipFinalSnapshot: true,
    publiclyAccessible: false,
    tags: { Project: "sspm", Service: "postgres" },
  });

  // DocumentDB Cluster
  const docdbPassword = new aws.secretsmanager.Secret("docdb-password", {
    description: "DocumentDB master password for SSPM",
  });
  const docdbPasswordValue = new aws.secretsmanager.SecretVersion("docdb-password-value", {
    secretId: docdbPassword.id,
    secretString: pulumi.secret("${randomPassword456!}") // Replace with a secure random generator in production
  });

  const docdbSubnetGroup = new aws.docdb.SubnetGroup("sspm-docdb-subnet-group", {
    subnetIds: network.privateSubnets,
    tags: { Project: "sspm" },
  });

  const documentdb = new aws.docdb.Cluster("sspm-docdb", {
    masterUsername: "sspmadmin",
    masterPassword: pulumi.interpolate`${docdbPasswordValue.secretString}`,
    dbSubnetGroupName: docdbSubnetGroup.name,
    vpcSecurityGroupIds: [network.vpc.vpc.defaultSecurityGroupId],
    clusterIdentifier: "sspm-docdb-cluster",
    skipFinalSnapshot: true,
    tags: { Project: "sspm", Service: "documentdb" },
  });

  return { rds, documentdb };
} 