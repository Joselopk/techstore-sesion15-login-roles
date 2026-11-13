import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productos } from "../data/productos";

function FeaturedProductCarousel() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const producto = productos[indiceActual];

  const mostrarSiguiente = () => {
    setIndiceActual((indice) => (indice + 1) % productos.length);
  };

  const mostrarAnterior = () => {
    setIndiceActual((indice) => (indice - 1 + productos.length) % productos.length);
  };

  useEffect(() => {
    if (pausado || productos.length < 2) return undefined;

    const intervalo = window.setInterval(mostrarSiguiente, 5000);
    return () => window.clearInterval(intervalo);
  }, [pausado]);

  return (
    <section className="featured-carousel card" aria-label="Productos destacados">
      <div className="featured-heading">
        <div>
          <p className="eyebrow">PRODUCTOS DESTACADOS</p>
          <h2>Descubre nuestros productos</h2>
          <p>La presentación cambia automáticamente cada cinco segundos.</p>
        </div>
        <span className="featured-counter" aria-live="polite">
          {indiceActual + 1} / {productos.length}
        </span>
      </div>

      <div className="featured-stage" aria-live="polite" aria-atomic="true">
        <div className="featured-slide" key={producto.id}>
          <div className="featured-image-wrap">
            <img
              className="featured-image"
              src={producto.imagen}
              alt={producto.nombre}
            />
          </div>
          <div className="featured-info">
            <span className="product-id">Producto #{producto.id}</span>
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <strong className="featured-price">
              ${producto.precio.toLocaleString("es-CO")}
            </strong>
            <Link to={`/productos/${producto.id}`} className="button">
              Ver producto
            </Link>
          </div>
        </div>
      </div>

      <div className="featured-controls">
        <button
          type="button"
          className="button secondary"
          onClick={mostrarAnterior}
          aria-label="Mostrar producto anterior"
        >
          ← Anterior
        </button>
        <div className="featured-dots" aria-label="Seleccionar producto">
          {productos.map((item, indice) => (
            <button
              key={item.id}
              type="button"
              className={`featured-dot ${indice === indiceActual ? "is-active" : ""}`}
              onClick={() => setIndiceActual(indice)}
              aria-label={`Mostrar ${item.nombre}`}
              aria-current={indice === indiceActual ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className="button secondary"
          onClick={mostrarSiguiente}
          aria-label="Mostrar producto siguiente"
        >
          Siguiente →
        </button>
      </div>

      <div className="featured-autoplay">
        <button
          type="button"
          className="link-button"
          onClick={() => setPausado((estado) => !estado)}
          aria-pressed={pausado}
        >
          {pausado ? "Reanudar presentación automática" : "Pausar presentación automática"}
        </button>
      </div>
    </section>
  );
}

export default FeaturedProductCarousel;
