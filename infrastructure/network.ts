import * as awsx from "@pulumi/awsx";

export function createNetwork() {
  // Create a new VPC with public and private subnets
  const vpc = new awsx.ec2.Vpc("sspm-vpc", {
    numberOfAvailabilityZones: 2,
    subnetSpecs: [
      { type: "Public" },
      { type: "Private" },
    ],
    tags: { Project: "sspm" },
  });

  // Extract subnet IDs
  const publicSubnets = vpc.publicSubnetIds;
  const privateSubnets = vpc.privateSubnetIds;

  return { vpc, publicSubnets, privateSubnets };
} 