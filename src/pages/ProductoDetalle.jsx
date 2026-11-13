import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FormularioContext } from "../context/FormularioContext";

function ProductoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito, catalogo } = useContext(FormularioContext);

  const producto = catalogo.find((item) => item.id === Number(id));

  if (!producto) {
    return (
      <section className="card page">
        <h1>Producto no encontrado</h1>
        <p>No existe un producto asociado al identificador {id}.</p>
        <button type="button" className="button" onClick={() => navigate(-1)}>
          Volver
        </button>
      </section>
    );
  }

  return (
    <section className="detail-card card">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="detail-image"
      />

      <div className="detail-content">
        <p className="eyebrow">DETALLE DEL PRODUCTO</p>
        <h1>{producto.nombre}</h1>
        <p>{producto.descripcion}</p>

        <strong className="detail-price">
          ${producto.precio.toLocaleString("es-CO")}
        </strong>

        <div className="card-actions">
          <button
            type="button"
            className="button"
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>

          <Link to="/productos" className="button secondary">
            Volver a productos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;
