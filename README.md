# Network Services — Web Front

*[English](#english) | [Español](#español)*

---

## English

Angular front-end for a university course project: a web platform where users can register, offer and browse services, rate and comment on them, manage friends/connections, and receive alerts. It also includes an admin dashboard with usage graphs and a moderation panel for reported services and users.

### Features

- User registration and authentication (login/logout, route guards)
- Service directory: create, browse and view service listings (with image upload)
- Comments and star-rating system on services
- Friends / connections and an alerts feed
- User profile editing
- Admin area: role-based access, reported services/users, and statistics dashboards (charts)
- Light/dark theme support

### Tech stack

- [Angular](https://angular.io/) 11 + Angular CLI
- [Angular Material](https://material.angular.io/) & [ng-bootstrap](https://ng-bootstrap.github.io/) / Bootstrap 4
- [Firebase](https://firebase.google.com/) (Authentication, Storage, Hosting)
- [GraphQL](https://graphql.org/) client (via `graphql` / `type-graphql`) for API communication
- [ECharts](https://echarts.apache.org/) (`ngx-echarts`) for dashboard graphs
- Karma / Jasmine for unit tests, Protractor for e2e tests

### Project structure

```
src/app/
├── components/     # Feature components (login, registration, services, reports, etc.)
├── conections/      # GraphQL inputs, responses and resolvers per domain (auth, services, users, reviews...)
├── guards/          # Route guards (auth / authorization)
├── models/          # Shared data models
├── providers/        # GraphQL connection provider
├── resolvers/        # Route resolvers that pre-fetch data
└── services/          # App-wide services (auth, theme)
```

### Getting started

```bash
# install dependencies
npm install

# run the dev server (http://localhost:4200)
npm start

# run unit tests
npm test

# production build
npm run build
```

> This project uses Firebase for auth/storage/hosting. If you fork it to run your own instance, replace the Firebase config in `src/app/app.module.ts` with your own project's credentials and adjust the Firestore/Storage security rules accordingly.

### Context

Built as a university programming course project. A companion repository, `proyecto-programacion-web-landing`, was used for the project's landing page.

---

## Español

Front-end en Angular de un proyecto de curso universitario: una plataforma web donde los usuarios pueden registrarse, ofrecer y explorar servicios, calificarlos y comentarlos, gestionar amigos/conexiones y recibir alertas. Incluye además un panel de administración con gráficos de uso y un módulo de moderación para servicios y usuarios reportados.

### Funcionalidades

- Registro y autenticación de usuarios (login/logout, guards de rutas)
- Directorio de servicios: creación, búsqueda y visualización de publicaciones (con carga de imágenes)
- Sistema de comentarios y calificación por estrellas en los servicios
- Amigos/conexiones y un feed de alertas
- Edición de perfil de usuario
- Panel de administración: acceso por roles, servicios/usuarios reportados y dashboards estadísticos (gráficos)
- Soporte de tema claro/oscuro

### Tecnologías

- [Angular](https://angular.io/) 11 + Angular CLI
- [Angular Material](https://material.angular.io/) y [ng-bootstrap](https://ng-bootstrap.github.io/) / Bootstrap 4
- [Firebase](https://firebase.google.com/) (Authentication, Storage, Hosting)
- Cliente [GraphQL](https://graphql.org/) (mediante `graphql` / `type-graphql`) para la comunicación con la API
- [ECharts](https://echarts.apache.org/) (`ngx-echarts`) para los gráficos del dashboard
- Karma / Jasmine para pruebas unitarias, Protractor para pruebas e2e

### Estructura del proyecto

```
src/app/
├── components/     # Componentes de cada funcionalidad (login, registro, servicios, reportes, etc.)
├── conections/      # Inputs, responses y resolvers de GraphQL por dominio (auth, servicios, usuarios, reseñas...)
├── guards/          # Guards de rutas (autenticación / autorización)
├── models/          # Modelos de datos compartidos
├── providers/        # Proveedor de conexión a GraphQL
├── resolvers/        # Resolvers de rutas que precargan datos
└── services/          # Servicios generales de la app (auth, tema)
```

### Cómo ejecutarlo

```bash
# instalar dependencias
npm install

# levantar el servidor de desarrollo (http://localhost:4200)
npm start

# ejecutar pruebas unitarias
npm test

# build de producción
npm run build
```

> Este proyecto usa Firebase para autenticación/almacenamiento/hosting. Si lo forkeas para correr tu propia instancia, reemplaza la configuración de Firebase en `src/app/app.module.ts` con las credenciales de tu propio proyecto y ajusta las reglas de seguridad de Firestore/Storage según corresponda.

### Contexto

Desarrollado como proyecto del curso universitario de programación. El repositorio complementario `proyecto-programacion-web-landing` se usó para la landing page del proyecto.
