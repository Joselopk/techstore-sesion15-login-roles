# TechStore – Sesión 13: Interfaces modernas con React

Este proyecto continúa la estructura y funcionalidad de TechStore de las sesiones anteriores. Conserva el catálogo, el carrusel destacado, las rutas, el formulario, el contexto global y el carrito persistente en localStorage. Se agregan cinco componentes interactivos.

## Requisitos
- Node.js compatible con Vite 7.

## Instalación y ejecución
```bash
npm install
npm run dev
```

## Rutas
- `/`: inicio con carrusel de productos destacados.
- `/productos`: catálogo y carrito.
- `/productos/:id`: detalle de producto.
- `/contacto`: formulario de contacto.
- `/interfaces`: laboratorio de Modal, Tabs, Dropdown, Accordion y Toast.

## Componentes nuevos
- `src/components/Modal.jsx`: ventana modal; cierra con botón, clic exterior o Escape.
- `src/components/Tabs.jsx`: pestañas controladas con useState.
- `src/components/Dropdown.jsx`: menú desplegable y cierre al hacer clic fuera.
- `src/components/Accordion.jsx`: secciones expandibles.
- `src/components/Toast.jsx`: notificación temporal con limpieza del temporizador.

Los nuevos estilos se encuentran al final de `src/styles.css`. No se requiere backend.


## Actualización: escaparate de interfaces
La ruta `/interfaces` ahora contiene catálogo visual, modales con fotografías y compra real, pestañas de producto, menú de acciones, preguntas frecuentes con imagen y avisos Toast. Las imágenes del catálogo se cargan desde Unsplash, por lo que requieren conexión a Internet.

## Sesión 14: gestión de archivos e imágenes

### Funcionalidad
- Ruta `/productos/nuevo`: formulario para registrar un producto con fotografía.
- Valida JPG, PNG y WEBP, con límite de 2 MB.
- Muestra vista previa con `URL.createObjectURL()` y libera el recurso con `URL.revokeObjectURL()`.
- Lee la imagen como Data URL con `FileReader` para persistir la demostración en `localStorage`.
- El catálogo se comparte con Context API. El producto nuevo aparece en `/productos` y `/interfaces`.
- El producto registrado se puede seleccionar desde las pestañas, dropdown, acordeón y modal de Interfaces modernas. También se puede agregar al carrito.

### Ejecutar
```bash
npm install
npm run dev
```

### Prueba sugerida
1. Abre `/productos/nuevo` y registra un producto con imagen menor de 2 MB.
2. Comprueba que aparece en `/productos`.
3. Abre `/interfaces`, selecciónalo en el selector de productos.
4. Prueba las pestañas, el menú desplegable, el acordeón y la vista rápida modal.
5. Agrega el producto al carrito y recarga la página para comprobar la persistencia.

### Nota técnica
Esta práctica guarda imágenes como Data URL en `localStorage`; no representa una carga real a un servidor. Para producción, las imágenes deben enviarse a un backend o servicio de almacenamiento mediante `FormData`. El almacenamiento del navegador tiene límites y no es adecuado para grandes volúmenes de imágenes.

## Sesión 15: login y autenticación basada en roles

### Roles
- Administrador: `admin@techstore.com` / `Admin123`
- Cliente: `cliente@techstore.com` / `Cliente123`

### Reglas implementadas
- `/login`: formulario de autenticación de demostración.
- El menú muestra nombre, rol y botón para cerrar sesión cuando hay sesión activa.
- Solo el rol `administrador` ve el enlace para registrar productos en el menú, la página de productos y la vista Interfaces.
- `/productos/nuevo` está envuelta en `RutaProtegida`. Si no hay sesión o el rol no es administrador, React Router redirige a `/404`, incluso al escribir la URL manualmente.
- El rol cliente puede navegar por el catálogo, detalles, carrito, contacto e Interfaces, pero no puede abrir el formulario de registro.
- La sesión se conserva en `sessionStorage` hasta cerrar sesión o cerrar la pestaña/navegador.

### Prueba en clase
1. Inicia sesión como cliente. Comprueba que no aparece ningún enlace o botón de registro.
2. Escribe manualmente `http://localhost:5173/productos/nuevo`. Debe aparecer la página 404.
3. Cierra sesión e ingresa como administrador. Debe aparecer el enlace «Registrar producto».
4. Registra un producto y comprueba que queda disponible en el catálogo.
5. Cierra sesión e ingresa como cliente: el formulario vuelve a estar bloqueado.

### Importante: alcance académico
Esta implementación simula autenticación y autorización en el frontend para enseñar Context API, rutas protegidas y renderizado condicional. Las credenciales de demostración están en el código y no constituyen seguridad real. En producción, el backend debe verificar contraseñas con hash, emitir una sesión/token seguro y autorizar cada operación (incluida la creación de productos) en el servidor. Ocultar botones o proteger rutas en React no reemplaza la autorización del backend.
