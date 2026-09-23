# Changelog

Todas las versiones notables de este proyecto se registran en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/). Cada cambio menor (patches 3.3.x.y) se registra como commit en el historial de Git.

## [V4.0.0] - 2026-09-23

### Agregado
- **Tema persistente**: preferencia guardada en `localStorage`, respetando `prefers-color-scheme` en el primer acceso y `prefers-reduced-motion`.
- **Estilos de impresión** (`@media print`) para imprimir/guardar el CV limpio.
- **Scroll Reveal** real con `IntersectionObserver`.
- **SEO y compartir**: Open Graph, Twitter Card, JSON-LD (`Profile`), canonical, `theme-color`, favicon SVG.
- **Captcha con propósito**: el correo (ofuscado en el código) solo se revela y copia tras validar la verificación.
- **Avatar real** (`perfil.PNG`) con fallback `JR_`.

### Refactor
- Migrado a estructura modular: CSS y JS extraídos a `assets/`, contenido del CV en `assets/data/profile.json`.
- i18n EN con diccionario `assets/js/i18n.en.json` y atributos `data-i18n`; ES sigue en el HTML (crawlable).
- `404.html`, `robots.txt` y `sitemap.xml` añadidos.
- Analítica **GA4** configurable (`window.GA_ID`).
- Workflow **Lighthouse CI** en GitHub Actions.

## [V3.3.9] - 2026

### Agregado
- **Vista modular**: reorganización de la SPA en módulos profesionales y personales.
- Documentación inicial del proyecto (`README.md` reescrito y `CHANGELOG.md` creado).

## [V3.3.8]

### Agregado
- **Captcha simulado** estilo reCAPTCHA antes de revelar el correo de contacto (protección anti-spam ilustrativa).

## [V3.3.7]

### Agregado
- Refinamientos visuales y funcionales de la interfaz Darcula.
- Mejoras de la barra lateral (sidebar) y animaciones.

## [V3.3.6]

### Agregado
- Mejoras de transiciones y micro-interacciones en JavaScript.

## [V3.3.4]

### Agregado
- Optimización del modo oscuro/claro con persistencia en `localStorage`.

## [V3.3]

### Agregado
- Primeras iteraciones del diseño Darcula UI.
- Acordeones, barra de progreso y scroll reveal.

## [v3.0 / V3 gemini]

### Agregado
- Rediseño completo del sitio como **Single Page Application**.
- Inicio del multilingüismo nativo (ES/EN).
- Implementación inicial generada con asistencia de IA (gemini).

## [v2.0]

### Agregado
- Segunda versión del sitio personal en HTML/CSS/JS plano.
- Separación entre contenido profesional y personal.

## [cambios globales]

### Cambiado
- Migración desde el tema **Beautiful Jekyll** a un sitio HTML estático sin framework.
- Eliminación de los componentes Jekyll (`Gemfile`, `_layouts/`, `_includes/`, etc.).

## [v1.0 - Beautiful Jekyll]

### Cambiado
- Sitio inicial basado en el tema Jekyll **Beautiful Jekyll**, con contenido en Markdown y páginas generadas por Jekyll.