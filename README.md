# Aplicación Web Modularizada — Parcial 2

Proyecto: Tienda de ropa (ejemplo)

Este repositorio contiene la estructura inicial y componentes para el segundo parcial: una aplicación web modularizada usando Vue 3 y Bootstrap 5. El proyecto está orientado a una tienda de ropa — campos de producto incluyen título, precio, talla y color — y está pensado como evidencia educativa.

## Nota importante sobre autenticación
La vista de inicio de sesión (`src/views/LoginView.vue`) valida credenciales leyendo un fichero local `public/usuarios.json`. Esta validación **es solo educativa** y no representa un sistema de autenticación real. Los usuarios y contraseñas en `public/usuarios.json` están en texto plano para facilitar las pruebas, por lo que **no** deben usarse en producción.

Si necesitas implementar autenticación real, considera:

- Usar un backend seguro con endpoints que devuelvan tokens (JWT) tras verificar credenciales de forma segura.
- Almacenar contraseñas con hashing (bcrypt, argon2) en la base de datos, nunca en texto plano.
- Usar HTTPS y mecanismos de renovación/revocación de tokens.

## Cómo probar el Login localmente (esqueleto)

1. Asegúrate de tener Node.js y npm instalados.
2. Desde la raíz del proyecto, inicializa y añade dependencias si aún no existen (opcional, recomendado usar Vite):

```powershell
npm init -y
npm install vue@3 vue-router@4
npm install -D vite @vitejs/plugin-vue
```

3. Añade un `src/main.js`, `src/App.vue` y `src/router/index.js` mínimos (puedo generarlos si los necesitas).

4. Ejecuta el servidor de desarrollo (si usas Vite):

```powershell
npm run dev
```

5. Abre el navegador en `http://localhost:5173/login` (o la ruta que configures) y usa las credenciales de ejemplo que están en `public/usuarios.json`:

- `admin` / `admin123`
- `user` / `user123`

Si las credenciales son correctas, la `LoginView` redirige a `/dashboard`. En caso de credenciales inválidas o error al leer el JSON, se muestra una alerta de Bootstrap en la propia vista.

## Estructura relevante

- `public/usuarios.json` — lista de usuarios de prueba (solo para desarrollo/educativo).
- `src/views/LoginView.vue` — vista de inicio de sesión que valida contra el JSON local y muestra alertas Bootstrap.

## Próximos pasos sugeridos

- Crear un scaffold mínimo (`src/main.js`, `src/App.vue`, `src/router/index.js`) para poder ejecutar la app localmente.
- Implementar la vista `Dashboard` y proteger rutas mediante una lógica de sesión simple (simulada) o con un guard de rutas si se añade autenticación real.
- Mover `README_STRUCTURE.md` dentro del `README.md` principal o fusionar su contenido.

---

Si quieres, creo ahora el scaffold mínimo (archivos `main.js`, `App.vue`, `router/index.js`) y agrego la ruta `/dashboard` con una vista `DashboardView.vue` placeholder para que la redirección desde el login funcione de inmediato. ¿Lo genero ahora?
