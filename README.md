# Personal Portfolio - Jesús Enrique Rojas L.

Este repositorio contiene el código fuente de mi sitio web profesional y portafolio personal, alojado en GitHub Pages. El diseño sigue la **estética Terminal/IDE**: esquema de colores Darcula (IntelliJ IDEA), hero que simula una consola con typing animado, tipografía monoespaciada y acentos técnicos.

## 🚀 Vista Previa
Puedes visitar el sitio en vivo aquí: [https://jesuserl.github.io/](https://jesuserl.github.io/)

## 🛠️ Stack Tecnológico
Sitio estático sin frameworks ni dependencias externas pesadas:

* **HTML5 Semántico:** estructura sólida y accesible con acceso directo a los datos.
* **CSS3 (Custom Properties & Grid/Flexbox):** diseño responsive y gestión de temas dinámicos.
* **Vanilla JavaScript:** lógica de micro-interacciones, render de contenido y multilingüismo.
* **JSON data-driven:** la experiencia, educación y hobbies viven en `assets/data/profile.json`; editar el CV no requiere tocar HTML.
* **SVG:** iconografía ligera de alta calidad.

## ✨ Características Principales
* **Diseño Darcula / Terminal-IDE:** ventana de terminal en el hero con typing animado de roles, cursor parpadeante y resplandores ambientales.
* **Top bar sticky de vidrio:** navegación fija con `backdrop-blur` que se compacta al hacer scroll; FAB "volver arriba" en móvil.
* **Banda de estadísticas con count-up:** años, tecnologías, empresas y certificaciones calculadas automáticamente del JSON.
* **Skills en marquee infinito:** tira deslizante de tecnologías con máscara de desvanecido y fila de comandos en contrasentido.
* **Experiencia en timeline:** línea temporal con nodos y glow al abrir el acordeón.
* **Hobby cards con tilt 3D:** inclinación al pasar el cursor (desactivada con `prefers-reduced-motion` y táctil).
* **Multilingüe Nativo (ES/EN):** textos primarios en ES dentro del HTML (crawlables) y diccionario EN cargado desde `assets/js/i18n.en.json`.
* **Modo Oscuro/Claro persistente:** se guarda en `localStorage` y respeta `prefers-color-scheme` al primer acceso (sin flash).
* **`prefers-reduced-motion`:** desactiva animaciones y efectos para usuarios sensibles.
* **UX de Alto Nivel:**
    * **Acordeones Interactivos:** experiencia laboral organizada en `details`/`summary`.
    * **Barra de Progreso:** indicador de lectura en la parte superior.
    * **Scroll Reveal:** animaciones suaves de aparición con `IntersectionObserver`.
    * **Accesibilidad (A11y):** landmarks semánticos y atributos ARIA en controles.
* **Ready for Print:** estilos `@media print` para imprimir o guardar el CV en PDF limpio (acordeones abiertos, marquee desplegado en etiquetas, sin navegación).
* **Captcha Simulado + Antispam:** el correo se ofusca en el código y solo se revela/copia tras validar el captcha.
* **Descarga de CV:** botón que descarga el resumen curricular en PDF.
* **SEO y Compartir:** Open Graph, Twitter Card, JSON-LD (`schema.org/Profile`), favicon, canonical y `theme-color`.
* **Analítica (GA4):** lista para activarse — define `window.GA_ID` en `index.html`.
* **Avatar real:** `perfil.PNG` como imagen de perfil (con fallback `JR_`).

## 📂 Estructura del Proyecto
```text
.
├── index.html                        # Layout de la Single Page Application
├── 404.html                          # Página de error con el mismo diseño
├── perfil.PNG                        # Imagen de perfil (avatar + og:image)
├── Resumen Curricular - Ing. Jesus Rojas -V4.pdf  # Currículum descargable
├── robots.txt                        # Permisos de rastreo + sitemap
├── sitemap.xml                       # Sitemap para buscadores
├── assets/
│   ├── favicon.svg                   # Favicon del sitio
│   ├── css/styles.css                # Estilos por secciones
│   ├── data/profile.json             # Contenido del CV (ES/EN data-driven)
│   └── js/
│       ├── main.js                   # Lógica de la app (render, i18n, temas)
│       └── i18n.en.json              # Diccionario de traducción inglés
├── .github/workflows/lighthouse.yml  # Auditoría Lighthouse en cada push
├── README.md                         # Este documento
└── CHANGELOG.md                      # Histórico de versiones
```

## 🚦 Despliegue
El repositorio se publica automáticamente como **GitHub Pages** (sitio de usuario) desde la rama `main` raíz.

1. `Settings → Pages → Deploy from a branch`, rama `main`, carpeta `/ (root)`.
2. Publicar. El sitio queda en `https://jesuserl.github.io`.

## 🧪 Desarrollo local
El contenido se carga desde JSON vía `fetch`, por lo que necesita un servidor HTTP local:

```bash
python -m http.server 8000
# o
npx serve
```

Abre `http://localhost:8000`.

Para editar el CV, modifica `assets/data/profile.json` (meses/fechas, puestos, descripciones en `es`/`en`).

## 📈 Analytics
Para activar GA4, define tu Measurement ID en `index.html`:

```js
window.GA_ID = 'G-XXXXXXXXXX';
```

## Licencia
Contenido y código personal de Jesús Enrique Rojas L.