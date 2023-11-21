#!/bin/bash

sudo systemctl enable docker
sudo systemctl start docker

#создаем Docker-file для серверa

cat > Dockerfile << EOF
FROM node:latest
COPY /node .
RUN npm install
CMD ["npm","run","dev"]
EOF

#собираем контейнер сервера

sudo docker build -t node .

#скачиваем контейнер для postgres

sudo docker pull postgres:15.5

#формируем Dockercompose

cat > docker-compose.yaml << EOF

version: "3.3"
services:

 postgres:
  restart: always
  image: postgres:15.5
  environment:
   POSTGRES_USER: postgres
   POSTGRES_PASSWORD: pr019fH31p!
   POSTGRES_DB: profcom
  volumes:
   - pgdata:/var/lib/postgresql/data
  ports:
   - 5432:5432

 node:
  depends_on:
   - postgres
  image: node
  ports:
   - 3001:3001
  restart: always
  environment:
   PORT: 3001
   DB_NAME: profcom
   DB_USER: postgres
   DB_PASSWORD: pr019fH31p!
   DB_HOST: postgres
   DB_PORT: 5432
   SECRET_KEY: profcom246123
  deploy:
   resources:
    limits:
     cpus: '0.001'
     memory: 50M
    reservations:
     cpus: '0.0001'
     memory: 20M

volumes:
 pgdata:
EOF