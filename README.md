<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Template base para proyecto de NestJS

¡Hola! Comparto con ustedes un proyecto base en NestJs que les permitirá tener sus módulos core separados de los módulos de servicio.

Este proyecto ya incluye la configuración inicial para el manejo de archivos .env y los módulos de Mongoose y TypeORM. Sin embargo, dado que desconozco qué tipo de base de datos utilizarán, solo proporciono la estructura básica de configuración, no la instalación de los paquetes necesarios."

#### En caso desees usar conexiones a mongo debes instalar el paquete
```
npm i @nestjs/mongoose
``` 

#### En caso desees usar conexiones a postregsql, mysql debes instalar el paquete
```
npm i @nestjs/typeorm
``` 

Recuerda que si no deseas utilizar alguno de los módulos previamente configurados deberas quitar la referencia a ellos en el archivo: **./core/core.module.ts**


Espero les sirva. 🤓🤘