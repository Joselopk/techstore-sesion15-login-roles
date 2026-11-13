import { Link } from "react-router-dom";

function ProductCard({ producto, onAdd }) {
  return (
    <article className="product-card">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="product-image"
      />

      <div className="product-content">
        <span className="product-id">Producto #{producto.id}</span>
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>

        <strong className="price">
          ${producto.precio.toLocaleString("es-CO")}
        </strong>

        <div className="card-actions">
          <Link to={`/productos/${producto.id}`} className="button secondary">
            Ver detalle
          </Link>

          <button
            type="button"
            className="button"
            onClick={() => onAdd(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
