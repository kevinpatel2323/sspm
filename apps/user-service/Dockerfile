# Use the base image
FROM node:20-alpine AS base

# Create app directory
WORKDIR /app

# Install dependencies only when needed
COPY package*.json ./

# Install dependencies
RUN npm install

# Install NestJS CLI globally in case we want to use it later
RUN npm install -g @nestjs/cli

# Copy shared libraries
COPY libs ./libs

# Development stage
FROM base AS development
ENV NODE_ENV=development
WORKDIR /app/apps/user-service
CMD ["npm", "run", "dev:user-service"]

# Builder stage
FROM base AS builder
ENV NODE_ENV=production

# Copy source code
COPY . .

# Install dependencies (NestJS CLI will be available in node_modules now)
RUN npm install

# Use npx to run the build command
RUN npx nest build

# Production stage
FROM node:20-alpine AS production
ENV NODE_ENV=production

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist/apps/user-service ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Set proper permissions
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Start the application
CMD ["node", "dist/main"]
