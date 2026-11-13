import { useState } from "react";
import { Link } from "react-router-dom";
import ClienteActual from "../components/ClienteActual";
import FeaturedProductCarousel from "../components/FeaturedProductCarousel";

function Inicio() {
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  return (
    <section className="page page-enter">
      <div className="hero card">
        <p className="eyebrow">TECHSTORE · REACT</p>
        <h1>Bienvenido a TechStore</h1>
        <p>
          Explora el catálogo, consulta productos y prueba las nuevas interfaces interactivas. Se conservan el carrito, el contexto global y la persistencia de datos.
        </p>
        <div className="demo-actions">
          <Link to="/productos" className="button">Explorar productos</Link>
          <Link to="/interfaces" className="button secondary">Probar interfaces modernas</Link>
        </div>
      </div>

      <FeaturedProductCarousel />

      <section className="card animation-lab">
        <p className="eyebrow">PRÁCTICA INTERACTIVA</p>
        <h2>Mostrar un mensaje animado</h2>
        <p>El estado de React cambia la clase CSS y activa la transición visual.</p>
        <button
          type="button"
          className="button"
          onClick={() => setMostrarMensaje((visible) => !visible)}
          aria-expanded={mostrarMensaje}
        >
          {mostrarMensaje ? "Ocultar mensaje" : "Mostrar mensaje"}
        </button>
        <div className={`animated-message ${mostrarMensaje ? "is-visible" : ""}`}>
          <strong>¡Operación realizada!</strong>
          <p>Este mensaje combina useState con transition y transform.</p>
        </div>
      </section>

      <ClienteActual />

      <section className="concept-grid">
        <article className="card concept-card">
          <h2>Transition</h2>
          <p>Suaviza cambios de propiedades CSS, por ejemplo color, sombra y posición.</p>
        </article>
        <article className="card concept-card">
          <h2>@keyframes</h2>
          <p>Define una secuencia de estados para animar la entrada de los elementos.</p>
        </article>
        <article className="card concept-card">
          <h2>useState</h2>
          <p>Controla cuándo se muestra un elemento o cuándo cambia su clase CSS.</p>
        </article>
      </section>
    </section>
  );
}

export default Inicio;
