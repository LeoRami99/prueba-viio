# Documentación del Proyecto

## Introducción

Este proyecto consiste en una aplicación web desarrollada con un **frontend en Next.js** y un **backend en Express con TypeScript**. Utiliza autenticación basada en JWT para asegurar el acceso a recursos protegidos y maneja el estado de la aplicación usando Zustand.

## Frontend

### Tecnologías y Herramientas

-   **Next.js**: Framework de React utilizado para construir la interfaz de usuario.
-   **Zustand**: Biblioteca para el manejo de estado, utilizada específicamente para gestionar la autenticación y la navegación del usuario.

### Características

-   **Autenticación y Redirección**: Si un usuario logueado intenta volver a la página de login, será redirigido automáticamente al home.
-   **Protección de Rutas**: Se implementó JWT junto con middleware de autenticación para proteger las rutas. Solo los usuarios autenticados pueden acceder a la sección de búsqueda de productos.

## Backend

### Tecnologías y Herramientas

-   **Express con TypeScript**: Framework utilizado para construir el servidor.
-   **JWT (JSON Web Tokens)**: Utilizado para la autenticación y protección de rutas.
-   **MySQL**: Sistema de gestión de base de datos SQL.
-   **ORM**: Utilizado para modelar y validar datos de manera eficiente dentro de la base de datos.
-   **SHA-256**: Algoritmo de encriptación para las contraseñas de los usuarios.

### Características

-   **Manejo de Errores**: Implementación de bloques try-catch y middleware para capturar y registrar errores en `log.txt`.
-   **Seguridad de Datos**: Las contraseñas son encriptadas usando SHA-256 para garantizar la seguridad en el almacenamiento.

## Docker

### Configuración

El proyecto está configurado para ejecutarse usando Docker, facilitando la implementación y el manejo de dependencias:

-   **docker-compose.yml**: Define y configura los servicios necesarios para ejecutar el proyecto, incluyendo el servicio de base de datos.

## Cómo Iniciar

Para iniciar el proyecto, asegúrate de tener Docker instalado y ejecuta el siguiente comando en la raíz del proyecto:

```bash
docker-compose up
```
