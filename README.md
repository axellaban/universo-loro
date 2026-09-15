# Universo Loro

Página índice estática con los proyectos del Universo Loro. Lista para desplegar en Vercel.

## Proyectos enlazados

| Proyecto | URL |
| --- | --- |
| Copiloto | https://loreado.vercel.app/copiloto |
| Simulacro | https://loreado.vercel.app/mock |
| Envía un Lorito | https://enviaunlorito.vercel.app/ |

## Estructura

- `index.html` — contenido y estructura de la página.
- `styles.css` — diseño responsive, fondo animado y estados interactivos.
- `script.js` — efecto de luz que responde al puntero.
- `favicon.svg` — ícono del sitio.

Para agregar un proyecto, copiá un bloque `<a class="project">` dentro de
`<section class="projects">` y actualizá el título, la descripción y la URL.

## Importar en Vercel

1. En Vercel: **Add New… → Project → Import Git Repository** y elegí `axellaban/universo-loro`.
2. En **Framework Preset** dejá **Other**.
3. Dejá vacíos **Build Command** y **Output Directory**.
4. Seleccioná **Deploy**.

Cada push a `main` vuelve a desplegar automáticamente.

## Ver en local

```bash
python3 -m http.server 3000
```

Luego entrá a http://localhost:3000.
