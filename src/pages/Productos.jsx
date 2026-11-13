import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

function Productos() {
  const { usuario } = useAuth();
  const {
    catalogo,
    carrito,
    agregarAlCarrito,
    disminuirCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    totalCarrito
  } = useContext(FormularioContext);

  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">CATÁLOGO</p>
        <h1>Productos</h1>
        {usuario?.rol === "administrador" && <Link to="/productos/nuevo" className="button">Registrar nuevo producto</Link>}
        <p>Agrega productos y comprueba que el carrito permanece después de recargar.</p>
      </div>

      <div className="products-grid">
        {catalogo.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAdd={agregarAlCarrito}
          />
        ))}
      </div>

      <section className="cart card">
        <div className="cart-header">
          <div>
            <p className="eyebrow">ESTADO GLOBAL</p>
            <h2>Carrito de compras</h2>
          </div>

          <button
            type="button"
            className="button danger"
            onClick={vaciarCarrito}
            disabled={carrito.length === 0}
          >
            Vaciar carrito
          </button>
        </div>

        {carrito.length === 0 ? (
          <p className="empty-state">
            El carrito está vacío. Agrega un producto para comenzar.
          </p>
        ) : (
          <>
            <div className="cart-list">
              {carrito.map((producto) => (
                <article className="cart-item" key={producto.id}>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="cart-image"
                  />

                  <div className="cart-info">
                    <h3>{producto.nombre}</h3>
                    <p>
                      Precio unitario: $
                      {producto.precio.toLocaleString("es-CO")}
                    </p>
                    <p>
                      Subtotal: $
                      {(producto.precio * producto.cantidad).toLocaleString(
                        "es-CO"
                      )}
                    </p>
                  </div>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      onClick={() => disminuirCantidad(producto.id)}
                    >
                      −
                    </button>

                    <strong>{producto.cantidad}</strong>

                    <button
                      type="button"
                      onClick={() => agregarAlCarrito(producto)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="link-button"
                    onClick={() => eliminarDelCarrito(producto.id)}
                  >
                    Eliminar
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>${totalCarrito.toLocaleString("es-CO")}</strong>
            </div>
          </>
        )}
      </section>
    </section>
  );
}

export default Productos;
