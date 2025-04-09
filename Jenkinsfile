pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'luizz8'  
  }

  stages {
    stage('Build usuario-servicio') {
      steps {
        dir('usuario-servicio') {
          withCredentials([usernamePassword(credentialsId: 'luis-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
              docker build -t ${DOCKER_HUB_USER}/usuariop7 .
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push ${DOCKER_HUB_USER}/usuariop7
            """
          }
        }
      }
    }
  }
}
