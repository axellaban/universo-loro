# Universo Loro

Página índice estática con los proyectos del Universo Loro. Lista para desplegar en Vercel.

## Proyectos enlazados

| Proyecto | URL |
| --- | --- |
| Copiloto | https://loreado.vercel.app/copiloto |
| Simulacro | https://loreado.vercel.app/mock |
| Envía un Lorito | https://enviaunlorito.vercel.app/ |

## Estructura

- `index.html` — la página completa. Todo el HTML, CSS y contenido viven acá.

Para agregar un proyecto nuevo, copiá un bloque `<a class="card">` dentro de
`<nav class="grid">` y cambiale el título, la descripción y la URL. La grilla se
reacomoda sola.

## Importar en Vercel

1. En Vercel: **Add New… → Project → Import Git Repository** y elegí `axellaban/universo-loro`.
2. En **Framework Preset** dejá **Other**.
3. **Build Command** y **Output Directory**: vacíos (es un sitio estático, no necesita build).
4. **Deploy**.

Cada push a la rama principal vuelve a desplegar automáticamente.

## Ver en local

Abrí `index.html` en el navegador, o levantá un server:

```bash
python3 -m http.server 3000
```

Luego entrá a http://localhost:3000
