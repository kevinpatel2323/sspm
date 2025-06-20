import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

export function setupSsm(databases: any) {
  // Store RDS connection string
  const rdsConn = new aws.ssm.Parameter("rds-connection-string", {
    type: "SecureString",
    value: pulumi.interpolate`postgresql://postgres:<password>@${databases.rds.address}:5432/sspm_central_db`,
    tags: { Project: "sspm" },
  });

  // Store DocumentDB connection string
  const docdbConn = new aws.ssm.Parameter("docdb-connection-string", {
    type: "SecureString",
    value: pulumi.interpolate`mongodb://sspmadmin:<password>@${databases.documentdb.endpoint}:27017/sspm?ssl=true`,
    tags: { Project: "sspm" },
  });

  return { rdsConn, docdbConn };
} 