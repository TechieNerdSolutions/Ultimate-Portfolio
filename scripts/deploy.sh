#!/bin/bash

# Exit on error
set -e

# Load environment variables
source .env

# Print current time
echo "Starting deployment at $(date)"

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run tests
echo "Running tests..."
npm run test

# Build the application
echo "Building the application..."
npm run build

# Restart the application
echo "Restarting the application..."
pm2 restart portfolio

# Print completion message
echo "Deployment completed at $(date)"
