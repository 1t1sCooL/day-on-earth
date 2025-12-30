pipeline {
    agent any
    
    environment {
        DOCKER_USER = '1t1scool'
        IMAGE_NAME  = 'day-on-earth'
        IMAGE_TAG   = "${BUILD_NUMBER}"
        FULL_IMAGE  = "${DOCKER_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
        LATEST_IMAGE = "${DOCKER_USER}/${IMAGE_NAME}:latest"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Docker Build & Push') {
            steps {
                // Используем те же учетные данные Docker Hub, что и в первом пайплайне
                withCredentials([usernamePassword(credentialsId: 'dockerhub', 
                                                 usernameVariable: 'DOCKER_HUB_USER', 
                                                 passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                    sh """
                        # Авторизация
                        echo "${DOCKER_HUB_PASSWORD}" | docker login -u "${DOCKER_HUB_USER}" --password-stdin
                        
                        # Сборка образа (Dockerfile должен быть в корне репозитория)
                        docker build -t ${FULL_IMAGE} -t ${LATEST_IMAGE} .
                        
                        # Пуш в Docker Hub
                        docker push ${FULL_IMAGE}
                        docker push ${LATEST_IMAGE}
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    // Обновляем тег образа в манифесте, если файл существует
                    if (fileExists('kubernetes/deployment.yaml')) {
                        sh "sed -i 's|image: .*|image: ${FULL_IMAGE}|g' kubernetes/deployment.yaml"
                    }
                    
                    // Применяем все манифесты (deployment, service, ingress, certificate) из папки kubernetes
                    // Команда 'kubectl apply -k' ожидает наличие файла kustomization.yaml в папке
                    // Если его нет, можно использовать 'kubectl apply -f kubernetes/'
                    if (fileExists('kubernetes/kustomization.yaml')) {
                        sh "kubectl apply -k kubernetes/"
                    } else {
                        sh "kubectl apply -f kubernetes/"
                    }
                }
            }
        }
    }
    
    post {
        always {
            sh "docker logout"
            // Удаляем локальные образы, чтобы не забивать место на сервере Jenkins
            sh "docker rmi ${FULL_IMAGE} ${LATEST_IMAGE} || true"
        }
    }
}