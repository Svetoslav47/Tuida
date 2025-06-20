pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Svetoslav47/Tuida'
            }
        }
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
