# Universo Loro

Página estática en blanco, lista para importar en Vercel.

## Estructura

- `index.html` — la página. Todo el HTML, CSS y contenido viven acá.

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
