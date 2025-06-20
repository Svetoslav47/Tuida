pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('Tuida') {
                    sh 'npm install'
                }
            }
        }
        stage('Run App') {
            steps {
                dir('Tuida') {
                    sh 'npm run dev'
                }
            }
        }
    }
}
