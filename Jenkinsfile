pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'luizz8'  
    K8S_NAMESPACE = 'sa-p5'
  }

  stages {
    // USUARIO
    stage('Build & Deploy usuario-servicio') {
      steps {
        dir('usuario-servicio') {
          withCredentials([usernamePassword(credentialsId: 'luis-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
              docker build -t usuariosp7 .
              docker tag usuariosp7:latest ${DOCKER_HUB_USER}/usuariosp7:latest
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push ${DOCKER_HUB_USER}/usuariosp7:latest
            """
          }
        }
        sh """
          kubectl apply -f kubernetes/Usuarios/app.yaml -n ${K8S_NAMESPACE}
          kubectl apply -f kubernetes/Usuarios/servicio.yaml -n ${K8S_NAMESPACE}
        """
      }
    }

    // MÉTODO
    stage('Build & Deploy metodo-servicio') {
      steps {
        dir('metodo-servicio') {
          withCredentials([usernamePassword(credentialsId: 'luis-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
              docker build -t metodosp7 .
              docker tag metodosp7:latest ${DOCKER_HUB_USER}/metodosp7:latest
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push ${DOCKER_HUB_USER}/metodosp7:latest
            """
          }
        }
        sh """
          kubectl apply -f kubernetes/Metodos/app.yaml -n ${K8S_NAMESPACE}
          kubectl apply -f kubernetes/Metodos/servicio.yaml -n ${K8S_NAMESPACE}
        """
      }
    }

    // PRODUCTO
    stage('Build & Deploy producto-servicio') {
      steps {
        dir('producto-servicio') {
          withCredentials([usernamePassword(credentialsId: 'luis-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
              docker build -t productosp7 .
              docker tag productosp7:latest ${DOCKER_HUB_USER}/productosp7:latest
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push ${DOCKER_HUB_USER}/productosp7:latest
            """
          }
        }
        sh """
          kubectl apply -f kubernetes/Producto/app.yaml -n ${K8S_NAMESPACE}
          kubectl apply -f kubernetes/Producto/servicio.yaml -n ${K8S_NAMESPACE}
        """
      }
    }

    // COMPRA
    stage('Build & Deploy compra-servicio') {
      steps {
        dir('compra-servicio') {
          withCredentials([usernamePassword(credentialsId: 'luis-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
              docker build -t comprasp7 .
              docker tag comprasp7:latest ${DOCKER_HUB_USER}/comprasp7:latest
              echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
              docker push ${DOCKER_HUB_USER}/comprasp7:latest
            """
          }
        }
        sh """
          kubectl apply -f kubernetes/Compras/app.yaml -n ${K8S_NAMESPACE}
          kubectl apply -f kubernetes/Compras/servicio.yaml -n ${K8S_NAMESPACE}
        """
      }
    }

    // INGRESS
    stage('Deploy Ingress') {
      steps {
        sh "kubectl apply -f kubernetes/Ingress/app.yaml -n ${K8S_NAMESPACE}"
      }
    }
  }
}
