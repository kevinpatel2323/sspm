import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as docker from "@pulumi/docker";

// Modularized infrastructure
import { createNetwork } from "./network";
import { createEcr } from "./ecr";
import { createDatabases } from "./db";
import { createEcs } from "./ecs";
import { setupSsm } from "./ssm";

// 1. Networking: VPC, Subnets (public/private)
// 2. Application Load Balancer (ALB)
// 3. ECS Cluster
// 4. ECR Repositories
// 5. RDS (PostgreSQL)
// 6. DocumentDB (MongoDB compatible)
// 7. SSM Parameter Store for secrets
// 8. ECS Services: API Gateway, User Service

// --- Networking: VPC, Subnets ---
const network = createNetwork();

// --- ECR Repositories ---
const ecr = createEcr();

// --- Databases: RDS, DocumentDB ---
const databases = createDatabases(network);

// --- SSM Parameter Store ---
const ssm = setupSsm(databases);

// --- ECS Cluster & Services ---
const ecs = createEcs({ network, ecr, databases, ssm });
