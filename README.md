# Proyecto

¡Hola!

## Descripción

Este proyecto utiliza la API pública de Marvel para proporcionar datos sobre personajes, cómics, y más. Puedes encontrar más información sobre esta API en [Marvel Developer Portal](https://developer.marvel.com).

## Stack Tecnológico

El proyecto está construido utilizando las siguientes tecnologías:

- ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
- ![Express.js](https://img.shields.io/badge/Backend-Express.js-blue)
- ![React](https://img.shields.io/badge/Frontend-React-blue)
- ![Node.js](https://img.shields.io/badge/Runtime-Node.js-green)
- ![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-purple)
- ![Vite](https://img.shields.io/badge/Build-Vite-yellow)

## Backend

nos vamos hacía -> con el comando cd Backend por ejemplo y estando ahi ejecutamos "npm install" para instalar las dependencias necesarias
luego de esto con el comando "npm run start" ponemos en ejecucion el servidor, por la base de datos no hay que preocuparse porque en este proyecto se esta 
usando un cluster de mongo en la nube, entonces de parte del backend eso sería todo 

Fronted:
Ahora nos vamos con otra terminal hacia la raiz de la carpeta Fronted, y ahi se ejecuta el comando "npm install", luego hay que levantarlo, usando el comando "npm run dev", si alguno de estos
dos comandos da algún problema, si es posible (estar usando un sistema Unix/Linux) recomiendo usar "sudo" al inicio del comando.

Y listo, no hay que configurar ninguna variable de entorno ni nada, aunque quiero aclarar que estoy 100% conciente que lo ideal sería poner las urls en un .env junto con los Api key de la api publica de marvel
pero decidí hacerlo así para que fuera más facíl de probar y levantar localmente.
