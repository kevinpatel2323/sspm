# SSPM Infrastructure as Code (Pulumi)

This folder contains the Pulumi scripts to provision the AWS infrastructure for the SSPM microservices architecture.

## Architecture Overview

- **VPC** with public and private subnets
- **Application Load Balancer (ALB)** for routing traffic
- **ECS Cluster** running:
  - API Gateway Service
  - User Service
- **ECR Repositories** for container images
- **RDS (PostgreSQL)** for relational data
- **DocumentDB (MongoDB compatible)** for document storage
- **SSM Parameter Store** for secrets and configuration

### Diagram

```
title AWS ECS Microservices Architecture with RDS & DocumentDB

User [icon: user]

AWS [icon: aws] {
  VPC [icon: aws-vpc] {
    Public Subnets [icon: aws-subnet-public]
    Private Subnets [icon: aws-subnet-private]

    Application Load Balancer [icon: aws-elb, label: "ALB"]

    ECS Cluster [icon: aws-ecs] {
      API Gateway Service [icon: aws-ecs, label: "API Gateway"]
      User Service [icon: aws-ecs, label: "User Service"]
    }

    Databases [icon: database] {
      PostgreSQL RDS [icon: aws-rds, label: "PostgreSQL"]
      MongoDB DocumentDB [icon: aws-docdb, label: "DocumentDB"]
    }
  }

  ECR [icon: aws-ecr] {
    API Gateway Repository [icon: aws-ecr, label: "API Gateway Repo"]
    User Service Repository [icon: aws-ecr, label: "User Service Repo"]
  }

  Parameter Store [icon: aws-ssm, label: "Parameter Store"]
}

// Connections
User > Application Load Balancer: HTTP
Application Load Balancer > API Gateway Service: port 80
Application Load Balancer > User Service: port 81

API Gateway Service <--> API Gateway Repository: pulls image
User Service <--> User Service Repository: pulls image

API Gateway Service --> Parameter Store: fetch secrets
User Service --> Parameter Store: fetch secrets
API Gateway Service > Databases: DB access
User Service > Databases: DB access
```

## Prerequisites

- [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
- AWS credentials configured (via `aws configure` or environment variables)
- Docker (for building and pushing images)
- Node.js (for Pulumi program)

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Set up your Pulumi stack:
   ```sh
   pulumi stack init dev
   pulumi config set aws:region <your-region>
   ```
3. Deploy the infrastructure:
   ```sh
   pulumi up
   ```

---

Edit `index.ts` to customize resources as needed. 