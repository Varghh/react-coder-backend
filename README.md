# React Coder + Backend - E-commerce de Mascotas

Aplicación de e-commerce desarrollada con React + Vite y backend Node.js para la venta de productos para mascotas.

## Estructura del Proyecto

```
react-coder-backend/
├── server/          # Backend API (Node.js + Express)
├── src/             # Frontend React
└── scripts/         # Scripts de utilidad
```

## Tecnologías

- **Frontend:** React 19, Vite, React Router
- **Backend:** Node.js, Express
- **Persistencia:** Archivos JSON

## Instalación

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm start
```

## Uso

1. Iniciar el servidor backend en el puerto 8080
2. Iniciar el frontend con `npm run dev`
3. Acceder a `http://localhost:5173`

## Endpoints API

- `GET /api/products` - Listar productos
- `GET /api/products/:id` - Obtener producto
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto
- `POST /api/carts` - Crear carrito
- `GET /api/carts/:id` - Obtener carrito
- `POST /api/carts/:id/product/:pid` - Agregar producto al carrito
