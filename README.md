# Lanceros Stereo 94.1 FM 📻

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

Bienvenido al repositorio oficial del reproductor web de **Lanceros Stereo 94.1 FM**, "La Emisora Comunitaria de Tuta, Boyacá". Esta aplicación moderna y optimizada ofrece una experiencia de escucha continua de alta calidad, visualización de audio en tiempo real y metadatos de transmisión.

## 🚀 Características Principales

*   **Streaming de Audio Robusto:** Reproducción ininterrumpida con recuperación automática de errores y manejo de estados (buffering, playing, error).
*   **Arquitectura Modular:** Estructura escalable basada en `Core`, `Features` y `Shared` para facilitar el mantenimiento y la expansión.
*   **Visualizador de Audio:** Experiencia visual atractiva e inmersiva sincronizada con la reproducción.
*   **Metadatos en Tiempo Real:** Visualización automática del título de la canción o programa actual utilizando `EventSource` (SSE).
*   **Interfaz de Usuario (UX) Premium:**
    *   Diseño responsive y adaptativo.
    *   Controles de volumen personalizados y consistentes (Cross-browser).
    *   Sistema de notificaciones "Toast" para feedback de errores de conexión.
*   **Seguridad:** Configuración segura mediante variables de entorno, sin exposición de secretos en el código fuente.

## 🛠️ Arquitectura Técnica

El proyecto sigue una arquitectura límpia y modular:

*   **`src/app/core`**: Servicios singleton (`RadioPlayerService`, `ConfigService`) y componentes de layout (`Header`, `Footer`).
*   **`src/app/features/radio`**: Lógica de negocio específica de la radio, dividida en `player-controls` (lógica) y `player-visualizer` (presentación).
*   **`src/app/shared`**: Componentes reutilizables como `ToastComponent` y `FloatingContact`.
*   **Estilos**: Variables CSS nativas (`:root`) para theming dinámico y alto rendimiento.

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/) (versión 18.13.0 o superior)
*   [Angular CLI](https://angular.io/cli) (versión 17.0.0 o superior recomedada)

## ⚙️ Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/juanitomanoplateada/lanceros-stereo.git
    cd lanceros-stereo
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configuración de Entorno:**
    La aplicación utiliza archivos de entorno para gestionar URLs de streaming.
    *   `src/environments/environment.ts` (Producción)
    *   `src/environments/environment.development.ts` (Desarrollo)

    Verifica que las variables `streamUrl` y `metadataUrl` estén correctamente configuradas.

## ▶️ Ejecución y Desarrollo

Para iniciar el servidor de desarrollo:

```bash
ng serve
```

Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.

## 📦 Construcción para Producción

Para generar los artefactos de producción optimizados:

```bash
npm run build
```

Los archivos de salida se almacenarán en el directorio `dist/lanceros-stereo`.

## 🚀 Despliegue en Vivo

La aplicación está desplegada y disponible en:

*   **Sitio Oficial:** [https://lancerosfm.online/](https://lancerosfm.online/)
*   **Vercel (Dev):** [https://lanceros-stereo-online-git-master-juanitomanoplateadas-projects.vercel.app/](https://lanceros-stereo-online-git-master-juanitomanoplateadas-projects.vercel.app/)

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios importantes antes de enviar un Pull Request.

## 📄 Licencia

Este proyecto es propiedad privada de **Lanceros Stereo 94.1 FM**. Todos los derechos reservados.
