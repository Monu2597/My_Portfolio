#!/bin/bash

# Portfolio Builder Deployment Script
# Usage: ./deploy.sh [environment]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-production}

echo -e "${GREEN}🚀 Starting deployment for environment: ${ENVIRONMENT}${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18 or higher.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18 or higher is required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version check passed: $(node -v)${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci

# Run type check
echo -e "${YELLOW}🔍 Running TypeScript type check...${NC}"
npm run check

# Clean previous build
echo -e "${YELLOW}🧹 Cleaning previous build...${NC}"
npm run clean

# Build the application
echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed. dist directory not found.${NC}"
    exit 1
fi

if [ ! -d "dist/public" ]; then
    echo -e "${RED}❌ Build failed. dist/public directory not found.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully!${NC}"

# Test the production build locally (macOS compatible)
echo -e "${YELLOW}🧪 Testing production build...${NC}"

# Start server in background
NODE_ENV=production npm start > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to start
sleep 5

# Test health endpoint
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Production build test passed!${NC}"
else
    echo -e "${RED}❌ Production build test failed!${NC}"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

# Stop test server
kill $SERVER_PID 2>/dev/null || true

echo -e "${GREEN}🎉 Deployment preparation completed successfully!${NC}"
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "   1. Set up your environment variables (see env.example)"
echo -e "   2. Deploy to your hosting platform:"
echo -e "      - Heroku: git push heroku main"
echo -e "      - Vercel: vercel --prod"
echo -e "      - Railway: railway up"
echo -e "      - Docker: docker build -t portfolio-builder ."
echo -e "   3. Or run locally: npm start"
echo -e ""
echo -e "${GREEN}🚀 Your portfolio is ready for deployment!${NC}"
