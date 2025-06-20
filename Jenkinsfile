pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'tuida-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
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
        
        stage('Test Application') {
            steps {
                dir('Tuida') {
                    sh 'npm run lint'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        stage('Deploy Docker Container') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh 'docker stop tuida-container || true'
                    sh 'docker rm tuida-container || true'
                    
                    // Run new container
                    sh "docker run -d --name tuida-container -p 8080:80 ${DOCKER_IMAGE}:${DOCKER_TAG}"
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
            echo "Deployment successful! Application is running on port 8080"
        }
        failure {
            echo "Deployment failed!"
        }
    }
}
