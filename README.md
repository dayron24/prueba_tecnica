# Prueba Técnica

¡Hola!

## Descripción

Este proyecto utiliza la API pública de Marvel para proporcionar datos sobre personajes, cómics y más. Se Puede encontrar más información sobre esta API en [Marvel Developer Portal](https://developer.marvel.com).

## Stack Tecnológico

El proyecto está construido utilizando las siguientes tecnologías:

- ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
- ![Express.js](https://img.shields.io/badge/Backend-Express.js-blue)
- ![React](https://img.shields.io/badge/Frontend-React-blue)
- ![Node.js](https://img.shields.io/badge/Runtime-Node.js-green)
- ![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-purple)
- ![Vite](https://img.shields.io/badge/Build-Vite-yellow)

## Backend

Primero, navega al directorio `/Backend` con el comando `cd Backend` y, estando ahí, ejecuta `npm install` para instalar las dependencias necesarias. Luego de esto, ejecuta el comando `npm run start` para poner en ejecución el servidor. No es necesario preocuparse por la base de datos, ya que en este proyecto se está utilizando un cluster de MongoDB en la nube. De parte del backend, eso sería todo.

## Frontend

En otra terminal, navega a la raíz de la carpeta `Frontend`, y ejecuta el comando `npm install`. Luego, levanta el servidor usando el comando `npm run dev`. Si alguno de estos comandos presenta problemas y estás utilizando un sistema Unix/Linux, recomiendo usar `sudo` al inicio del comando.

## Nota Adicional

No es necesario configurar ninguna variable de entorno ni nada adicional. Quiero aclarar que estoy 100% consciente de que lo ideal sería poner las URLs en un archivo `.env` junto con las API keys de la API pública de Marvel, pero decidí hacerlo de esta manera para que fuera más fácil de probar y ejecutar localmente.

## Otra aclaración

Los datos de los personakes que inclui son relativamente pocos, lo que pasa esque el endpoint que carga datos de la API ("http://localhost:3000/api/characters/load-characters-from-api"), lo he corrido manualmente con solicitudes http usando la extension thunder de VS code y estos datos los he filtrado, por ejemplo de entre 100 personajes solo guarde en mi base de datos los que tuvieran una foto disponible, que su descripcion no fuera vacía o nula son cosas que tome en cuenta para dejar solo datos que yo considero de mejor calidad para mostrar en el cliente (Fronted).

