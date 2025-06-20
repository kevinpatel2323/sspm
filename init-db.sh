#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z postgres 5432; do
  sleep 0.1
done
echo "PostgreSQL is ready!"

# Create the central database
PGPASSWORD=postgres psql -h postgres -U postgres -c "CREATE DATABASE sspm_central_db;"

echo "Database initialization completed!" 