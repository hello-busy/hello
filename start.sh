#!/bin/bash

echo "🚀 Starting Hello Platform..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker found"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update the JWT_SECRET in .env for production use!"
fi

echo "🐳 Starting containers with Docker Compose..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 5

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ Platform is running!"
    echo ""
    echo "📍 Access the platform at: http://localhost:3000"
    echo "📚 API Documentation: API.md"
    echo "📖 Usage Guide: USAGE_GUIDE.md"
    echo ""
    echo "To stop the platform, run: docker-compose down"
    echo "To view logs, run: docker-compose logs -f"
else
    echo ""
    echo "❌ Failed to start services. Check logs with: docker-compose logs"
    exit 1
fi
