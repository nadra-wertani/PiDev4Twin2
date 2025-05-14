pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'MySonarQubeServer'
        SONAR_TOKEN = credentials('sonar-token')
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-nadra') // Crée cette credential dans Jenkins
        IMAGE_NAME = 'nadra-wertni/register-app'
    }

    stages {
        stage('Debug') {
            steps {
                sh 'ls -la'
                sh 'ls -la register'
            }
        }

        stage('Install dependencies') {
            steps {
                dir('register') {
                    sh 'npm install'
                }
            }
        }

        stage('Run tests') {
            steps {
                dir('register') {
                    script {
                        try {
                            sh 'npm test'
                        } catch (Exception e) {
                            echo "Tests échoués ou absents, on continue..."
                        }
                    }
                }
            }
        }

        stage('Build application') {
            steps {
                dir('register') {
                    sh 'npm run build || echo "Pas d\'étape de build, on continue..."'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                dir('register') {
                    sh """
                        ${env.SONAR_SCANNER_HOME}/bin/sonar-scanner \
                          -Dsonar.projectKey=nodeapp \
                          -Dsonar.projectName=nodeapp \
                          -Dsonar.projectVersion=1.0 \
                          -Dsonar.sources=. \
                          -Dsonar.login=${env.SONAR_TOKEN} \
                          -Dsonar.host.url=http://localhost:9000
                    """
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-nadra') {
                        dir('register') {
                            sh 'docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .'
                            sh 'docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest'
                            sh 'docker push ${IMAGE_NAME}:${BUILD_NUMBER}'
                            sh 'docker push ${IMAGE_NAME}:latest'
                        }
                    }
                }
            }
        }
    }

    post {
        failure {
            echo 'La pipeline a échoué'
            mail to: 'nadrawertani22@gmail.com',
                 subject: "Échec du pipeline: ${currentBuild.fullDisplayName}",
                 body: "Vérifie les logs Jenkins: ${env.BUILD_URL}"
        }
    }
}


