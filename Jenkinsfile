pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'tuida-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        CONTAINER_PORT = "5678"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir('Tuida') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build Application') {
            steps {
                dir('Tuida') {
                    sh 'npm run build'
                }
            }
        }
        
        // stage('Test Application') {
        //     steps {
        //         dir('Tuida') {
        //             sh 'npm run lint'
        //         }
        //     }
        // }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Add verbose output and error handling for legacy Docker
                    sh '''
                        echo "Starting Docker build..."
                        echo "Current directory: $(pwd)"
                        echo "Files in current directory:"
                        ls -la
                        echo "Building Docker image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} . --no-cache
                        echo "Docker build completed successfully"
                    '''
                }
            }
        }
        
        stage('Deploy Docker Container') {
            steps {
                script {
                    // More thorough cleanup of existing containers
                    sh '''
                        echo "Cleaning up existing containers..."
                        docker stop tuida-container || echo "No existing container to stop"
                        docker rm tuida-container || echo "No existing container to remove"
                        
                        echo "Starting new container on port 5678..."
                        docker run -d --name tuida-container -p 5678:80 ${DOCKER_IMAGE}:${DOCKER_TAG}
                        echo "Container started successfully"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo "Deployment successful! Application is running on port 5678"
            script {
                // Show running containers
                sh 'docker ps'
            }
        }
        failure {
            echo "Deployment failed!"
            script {
                // Show Docker images and containers for debugging
                sh 'docker images'
                sh 'docker ps -a'
            }
        }
    }
}
