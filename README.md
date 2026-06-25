# Lanceros Stereo 94.1 FM

[![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=sass&logoColor=white)](https://sass-lang.com/)

Repositorio oficial del reproductor web de Lanceros Stereo 94.1 FM, emisora comunitaria de Tuta, Boyacá. Esta aplicación ofrece una experiencia de escucha continua de alta calidad, visualización de audio en tiempo real y metadatos de transmisión.

## Características

*   **Streaming de audio:** Reproducción ininterrumpida con recuperación automática de errores y gestión de estados (buffering, playing, error).
*   **Arquitectura modular:** Estructura basada en los directorios Core, Features y Shared para facilitar la escalabilidad.
*   **Visualizador de audio:** Animación sincronizada con el estado de reproducción del stream.
*   **Metadatos en tiempo real:** Visualización del título de la canción o programa actual mediante Server-Sent Events (SSE).
*   **Interfaz adaptativa:** Diseño responsivo con soporte táctil mejorado, controles de volumen avanzados y marquesina de texto optimizada exclusivamente para dispositivos móviles.

## Requisitos previos

*   Node.js (versión 18.13.0 o superior)
*   Angular CLI (versión 17.0.0 o superior)

## Instalación y configuración

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/juanitomanoplateada/lanceros-stereo.git
   cd lanceros-stereo
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configuración de entorno:
   
   La aplicación utiliza archivos de entorno para gestionar las URLs de streaming y metadatos:
   *   `src/environments/environment.ts` (Producción)
   *   `src/environments/environment.development.ts` (Desarrollo)

   Verifique que las variables `streamUrl` y `metadataUrl` estén correctamente definidas en dichos archivos.

## Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
ng serve
```

Navegue a `http://localhost:4200/`. La aplicación se recargará automáticamente al realizar cambios en los archivos fuente.

## Producción

Para generar el compilado optimizado de producción:

```bash
npm run build
```

Los archivos de salida se guardarán en el directorio `dist/lanceros-stereo`.

## Despliegue

La aplicación está disponible en los siguientes enlaces:

*   **Sitio oficial:** [https://lancerosfm.online/](https://lancerosfm.online/)
*   **Entorno de desarrollo:** [https://lanceros-stereo-online-git-master-juanitomanoplateadas-projects.vercel.app/](https://lanceros-stereo-online-git-master-juanitomanoplateadas-projects.vercel.app/)

## Licencia

Este proyecto es propiedad de Lanceros Stereo 94.1 FM. Todos los derechos reservados.
