#!/bin/bash

echo "=== Docker Build Debug Script ==="
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la

echo ""
echo "=== Checking if Docker is running ==="
docker --version
docker info

echo ""
echo "=== Building Docker image with verbose output ==="
docker build -t tuida-app:test . --no-cache

if [ $? -eq 0 ]; then
    echo ""
    echo "=== Build successful! Testing container ==="
    docker run --rm -d --name tuida-test -p 8080:80 tuida-app:test
    echo "Container started. Check http://localhost:8080"
    echo "Press Enter to stop and remove test container..."
    read
    docker stop tuida-test
    docker rm tuida-test
else
    echo ""
    echo "=== Build failed! ==="
    exit 1
fi 