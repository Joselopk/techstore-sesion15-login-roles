import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs";
import Dropdown from "../components/Dropdown";
import Accordion from "../components/Accordion";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";

const dinero = (valor) => `$${valor.toLocaleString("es-CO")}`;

const detalles = {
  1: { categoria: "Computadores", caracteristicas: ["Ideal para programación, clases y ofimática", "Pantalla amplia para multitarea", "Portátil para estudio y trabajo"], garantia: "12 meses", envio: "Envío nacional de 2 a 5 días hábiles" },
  2: { categoria: "Dispositivos móviles", caracteristicas: ["Pantalla táctil para lectura y apuntes", "Ideal para videollamadas y multimedia", "Diseño ligero y portátil"], garantia: "12 meses", envio: "Envío nacional de 2 a 5 días hábiles" },
  3: { categoria: "Pantallas", caracteristicas: ["Espacio adicional de trabajo", "Adecuado para edición y productividad", "Compatible con escritorios modernos"], garantia: "12 meses", envio: "Envío nacional de 2 a 5 días hábiles" },
  4: { categoria: "Accesorios", caracteristicas: ["Escritura cómoda para jornadas largas", "Diseño mecánico para mayor respuesta", "Útil para programación y gaming"], garantia: "6 meses", envio: "Envío nacional de 2 a 5 días hábiles" }
};

function InterfacesModernas() {
  const { catalogo, agregarAlCarrito, cantidadProductos, totalCarrito } = useContext(FormularioContext);
  const { usuario } = useAuth();
  const [productoId, setProductoId] = useState(null);
  const producto = catalogo.find((item) => item.id === productoId) || catalogo[0];
  const [modalAbierto, setModalAbierto] = useState(false);
  const [notificacion, setNotificacion] = useState("");
  const [tipoNotificacion, setTipoNotificacion] = useState("success");
  const cerrarToast = useCallback(() => setNotificacion(""), []);
  const info = (producto && detalles[producto.id]) || {
    categoria: producto?.categoria || "Nuevo producto",
    caracteristicas: ["Producto agregado desde el formulario de TechStore", "Imagen seleccionada por el usuario", "Disponible en el catálogo y carrito"],
    garantia: "Por definir",
    envio: "Consultar condiciones de envío"
  };

  const avisar = (mensaje, tipo = "success") => {
    setNotificacion("");
    setTipoNotificacion(tipo);
    // Se cambia el mensaje de estado para mostrar la notificación.
    setNotificacion(mensaje);
  };
  const agregar = (item) => {
    agregarAlCarrito(item);
    avisar(`${item.nombre} se agregó al carrito`);
  };
  const elegir = (item, abrir = false) => {
    setProductoId(item.id);
    if (abrir) setModalAbierto(true);
  };
  useEffect(() => { if (catalogo.length && productoId === null) setProductoId(catalogo[0].id); }, [catalogo, productoId]);
  const accionProducto = (accion) => {
    if (accion === "Agregar al carrito") agregar(producto);
    if (accion === "Ver detalles") setModalAbierto(true);
    if (accion === "Consultar disponibilidad") avisar(`Consulta de disponibilidad de ${producto.nombre}: comunícate con ventas.`, "warning");
  };

  return (
    <section className="page page-enter interfaces-page shop-demo">
      <header className="shop-hero">
        <div>
          <p className="eyebrow">TECHSTORE · EXPERIENCIA DE COMPRA</p>
          <h1>Explora tecnología para tu día a día</h1>
          <p>Una tienda interactiva donde los modales, pestañas, menús, acordeones y notificaciones tienen funciones reales sobre el catálogo.</p>
          <div className="shop-hero-actions">
            <a className="button" href="#explorar">Explorar productos</a>
            {usuario?.rol === "administrador" && <Link className="button secondary" to="/productos/nuevo">＋ Registrar producto</Link>}
            <Link className="button secondary" to="/productos">Ver carrito ({cantidadProductos})</Link>
          </div>
        </div>
        <img src={catalogo[0]?.imagen || ""} alt="Producto destacado de TechStore" />
      </header>

      <div className="shop-metrics">
        <div><span>Productos disponibles</span><strong>{catalogo.length}</strong></div>
        <div><span>Artículos en carrito</span><strong>{cantidadProductos}</strong></div>
        <div><span>Total de compra</span><strong>{dinero(totalCarrito)}</strong></div>
      </div>

      <section className="shop-section" id="explorar">
        <p className="eyebrow">CATÁLOGO COMPARTIDO</p>
        <p>Los productos registrados en la sección de carga aparecen aquí y pueden seleccionarse en los componentes de esta página.</p>
        <div className="shop-heading"><div><p className="eyebrow">01 · MODAL + CATÁLOGO</p><h2>Productos destacados</h2><p>Selecciona «Vista rápida» para abrir una ficha con imagen y opción de compra.</p></div></div>
        <div className="shop-products">
          {catalogo.map((item) => (
            <article className={`shop-product ${producto.id === item.id ? "is-selected" : ""}`} key={item.id}>
              <div className="shop-image"><img src={item.imagen} alt={item.nombre} loading="lazy" /><span>{detalles[item.id]?.categoria || item.categoria || "Producto"}</span></div>
              <div className="shop-product-body"><h3>{item.nombre}</h3><p>{item.descripcion}</p><strong className="shop-price">{dinero(item.precio)}</strong>
                <div className="shop-product-actions">
                  <button className="button" onClick={() => elegir(item, true)}>Vista rápida</button>
                  <button className="button secondary" onClick={() => { elegir(item); agregar(item); }}>Añadir +</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shop-section">
        <p className="eyebrow">02 · TABS</p><h2>Ficha interactiva del producto</h2>
        <p>Elige un producto: las pestañas actualizan su contenido según la selección.</p>
        <div className="shop-selector">
          {catalogo.map((item) => <button key={item.id} className={`shop-select-item ${producto.id === item.id ? "active" : ""}`} onClick={() => elegir(item)} aria-pressed={producto.id === item.id}>
            <img src={item.imagen} alt="" /><span>{item.nombre}</span>
          </button>)}
        </div>
        <div className="shop-feature">
          <img src={producto.imagen} alt={producto.nombre} />
          <div><p className="eyebrow">{info.categoria}</p><h3>{producto.nombre}</h3><strong className="shop-price">{dinero(producto.precio)}</strong>
            <Tabs key={producto.id} items={[
              { titulo: "Descripción", contenido: <p>{producto.descripcion} Una opción pensada para el catálogo TechStore.</p> },
              { titulo: "Características", contenido: <ul>{info.caracteristicas.map((texto) => <li key={texto}>{texto}</li>)}</ul> },
              { titulo: "Envíos y garantía", contenido: <div><p>Garantía de referencia: {info.garantia}.</p><p>{info.envio} (información demostrativa).</p></div> }
            ]} />
          </div>
        </div>
      </section>

      <div className="shop-two-columns">
        <section className="shop-section">
          <p className="eyebrow">03 · DROPDOWN</p><h2>Acciones sobre {producto.nombre}</h2>
          <div className="shop-small-product"><img src={producto.imagen} alt={producto.nombre} /><div><h3>{producto.nombre}</h3><p>{dinero(producto.precio)}</p></div></div>
          <p>El menú ejecuta acciones sobre el producto seleccionado.</p>
          <Dropdown opciones={["Ver detalles", "Agregar al carrito", "Consultar disponibilidad"]} onSeleccionar={accionProducto} />
        </section>
        <section className="shop-section">
          <p className="eyebrow">04 · ACCORDION</p><h2>Ayuda para tu compra</h2>
          <Accordion items={[
            { pregunta: `¿Qué incluye ${producto.nombre}?`, respuesta: <div className="shop-answer"><img src={producto.imagen} alt="" /><p>{producto.descripcion}</p></div> },
            { pregunta: "¿Cuánto tarda el envío?", respuesta: <p>{info.envio}. El tiempo es ilustrativo para esta demostración.</p> },
            { pregunta: "¿Cómo funciona la garantía?", respuesta: <p>Para {producto.nombre}, la garantía de ejemplo es de {info.garantia}. Confirma condiciones con el vendedor.</p> },
            { pregunta: "¿Cómo guardo mi compra?", respuesta: <p>Al agregar productos, el carrito se actualiza con Context API y se conserva en localStorage del navegador.</p> }
          ]} />
        </section>
      </div>

      <section className="shop-section shop-notifications">
        <div><p className="eyebrow">05 · TOAST</p><h2>Notificaciones de la tienda</h2><p>Los mensajes confirman acciones de compra o muestran avisos sin interrumpir la navegación.</p></div>
        <div className="shop-hero-actions"><button className="button" onClick={() => agregar(producto)}>Agregar {producto.nombre}</button><button className="button secondary" onClick={() => avisar("Revisa los datos de entrega antes de finalizar la compra.", "warning")}>Ver aviso</button></div>
      </section>

      <Modal abierto={modalAbierto} cerrar={() => setModalAbierto(false)} titulo={`Vista rápida · ${producto.nombre}`}>
        <div className="shop-modal-grid">
          <img src={producto.imagen} alt={producto.nombre} />
          <div><p className="eyebrow">{info.categoria}</p><h3>{producto.nombre}</h3><p>{producto.descripcion}</p><strong className="shop-price">{dinero(producto.precio)}</strong>
            <ul>{info.caracteristicas.map((texto) => <li key={texto}>{texto}</li>)}</ul>
            <p className="shop-muted">Garantía de referencia: {info.garantia}</p>
            <button className="button" onClick={() => { agregar(producto); setModalAbierto(false); }}>Agregar al carrito</button>
            <Link className="shop-detail-link" to={`/productos/${producto.id}`} onClick={() => setModalAbierto(false)}>Ver página completa del producto</Link>
          </div>
        </div>
      </Modal>
      <Toast mensaje={notificacion} tipo={tipoNotificacion} cerrar={cerrarToast} />
    </section>
  );
}
export default InterfacesModernas;
