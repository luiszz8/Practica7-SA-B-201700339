# Practica 6

| Nombre completo                | Carnet    |
| ------------------------------ | --------- |
| Luis Fernando Sánchez Soto     | 201700339 |

# Comandos

```sh
#Usuarios
#Se construye la imagen
docker build -t usuariosp6 .
#Se crea el tag
docker tag usuariosp6:latest luizz8/usuariosp6:latest
#Se hace el push a docker hub
docker push luizz8/usuariosp6:latest
#Se Realiza el despliegue de Deployment y HorizontalPodAutoscaler
kubectl apply -f /home/bodega_luizz/Usuarios/app.yaml -n sa-p5 
#Se Realiza el despliegue de Service
kubectl apply -f /home/bodega_luizz/Usuarios/servicio.yaml -n sa-p5 

#Metodo
#Se construye la imagen
docker build -t metodosp6 .
#Se crea el tag
docker tag metodosp6:latest luizz8/metodosp6:latest
#Se hace el push a docker hub
docker push luizz8/metodosp6:latest
#Se Realiza el despliegue de Deployment y HorizontalPodAutoscaler
kubectl apply -f /home/bodega_luizz/Metodos/app.yaml -n sa-p5
#Se Realiza el despliegue de Service
kubectl apply -f /home/bodega_luizz/Metodos/servicio.yaml -n sa-p5

#Producto
#Se construye la imagen
docker build -t productosp6 .
#Se crea el tag
docker tag productosp6:latest luizz8/productosp6:latest
#Se hace el push a docker hub
docker push luizz8/productosp6:latest
#Se Realiza el despliegue de Deployment y HorizontalPodAutoscaler
kubectl apply -f /home/bodega_luizz/Producto/app.yaml -n sa-p5
#Se Realiza el despliegue de Service
kubectl apply -f /home/bodega_luizz/Producto/servicio.yaml -n sa-p5

#Compra
#Se construye la imagen
docker build -t comprasp6 .
#Se crea el tag
docker tag comprasp6:latest luizz8/comprasp6:latest
#Se hace el push a docker hub
docker push luizz8/comprasp6:latest
#Se Realiza el despliegue de Deployment y HorizontalPodAutoscaler
kubectl apply -f /home/bodega_luizz/Compras/app.yaml -n sa-p5
#Se Realiza el despliegue de Service
kubectl apply -f /home/bodega_luizz/Compras/servicio.yaml -n sa-p5

#Despliegue Ingress
kubectl apply -f /home/bodega_luizz/Ingress/app.yaml -n sa-p5
```

# Archivos yaml


## Usuarios
``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: usuarios
  namespace: sa-p5
  labels:
    app: usuarios
spec:
  replicas: 1
  selector:
    matchLabels:
      app: usuarios
  template:
    metadata:
      labels:
        app: usuarios
    spec:
      containers:
      - name: usuarios
        image: luizz8/usuariosp6
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "1024Mi"
            cpu: "1000m"
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: usuarios-hpa
  namespace: sa-p5
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: usuarios
  minReplicas: 1
  maxReplicas: 2
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nodeport-usuarios
  namespace: sa-p5
spec:
  selector:
    app: usuarios
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
      nodePort: 30001  
  type: NodePort
```

## Metodos
``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metodos
  namespace: sa-p5
  labels:
    app: metodos
spec:
  replicas: 1
  selector:
    matchLabels:
      app: metodos
  template:
    metadata:
      labels:
        app: metodos
    spec:
      containers:
      - name: metodos
        image: luizz8/metodosp6
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "1024Mi"
            cpu: "1000m"
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: metodos-hpa
  namespace: sa-p5
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: metodos
  minReplicas: 1
  maxReplicas: 2
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nodeport-metodos
  namespace: sa-p5
spec:
  selector:
    app: metodos
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
      nodePort: 30001  
  type: NodePort
```

## Productos
``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: productos
  namespace: sa-p5
  labels:
    app: productos
spec:
  replicas: 1
  selector:
    matchLabels:
      app: productos
  template:
    metadata:
      labels:
        app: productos
    spec:
      containers:
      - name: productos
        image: luizz8/productosp6
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "1024Mi"
            cpu: "1000m"
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: productos-hpa
  namespace: sa-p5
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: productos
  minReplicas: 1
  maxReplicas: 2
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nodeport-productos
  namespace: sa-p5
spec:
  selector:
    app: productos
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
      nodePort: 30001  
  type: NodePort
```

## Compras
``` yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: compras
  namespace: sa-p5
  labels:
    app: compras
spec:
  replicas: 1
  selector:
    matchLabels:
      app: compras
  template:
    metadata:
      labels:
        app: compras
    spec:
      containers:
      - name: compras
        image: luizz8/comprasp6
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "1024Mi"
            cpu: "1000m"
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: compras-hpa
  namespace: sa-p5
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: compras
  minReplicas: 1
  maxReplicas: 2
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
---
apiVersion: v1
kind: Service
metadata:
  name: nodeport-compras
  namespace: sa-p5
spec:
  selector:
    app: compras
  ports:
    - protocol: TCP
      port: 3000
      targetPort: 3000
      nodePort: 30001  
  type: NodePort
```

## Ingress

``` yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: sa-p5-ingress
  namespace: sa-p5
  annotations:
    kubernetes.io/ingress.class: "gce"
spec:
  rules:
    - http:
        paths:
          - path: /users
            pathType: Prefix
            backend:
              service:
                name: nodeport-usuarios
                port:
                  number: 3000
          - path: /graphql
            pathType: Prefix
            backend:
              service:
                name: nodeport-productos
                port:
                  number: 3001
          - path: /graphql-metodos
            pathType: Prefix
            backend:
              service:
                name: nodeport-metodos
                port:
                  number: 3002
          - path: /compras
            pathType: Prefix
            backend:
              service:
                name: nodeport-compras
                port:
                  number: 3003
```

# Arquitectura

![alt text](<arqui.png>)


# Nube Seleccionada

## GCP

Se utilizo gcp con kubernetes ya que el manejo del clouster es bastante sencillo, el cobro solo se realiza cuando hay algo desplegado y sus servicios tienen comunicación entre sí. Y la forma de creditos es conveniente par las preubas.

# Servicios

## Google Kubernetes Engine (GKE)

Es la herramienta de de google cloud para el despliegue de kubernetes, donde google da la opción de que ellos se encarguen de el control.

## Cloud SQL

Es la herramienta de google cloud para la implemntación de bases de datos, en este caso se aplico MySQL con una red privada.

## Comandos

- apply: para la implementación de los archvios yaml.