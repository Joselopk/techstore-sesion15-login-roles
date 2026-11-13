import { useContext, useState } from "react";
import { FormularioContext } from "../context/FormularioContext";

function Contacto() {
  const {
    formulario,
    setFormulario,
    carrito,
    totalCarrito,
    limpiarFormulario
  } = useContext(FormularioContext);

  const [enviado, setEnviado] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value
    }));

    setEnviado(false);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <section className="page">
      <div className="page-heading">
        <p className="eyebrow">CONTACTO</p>
        <h1>Datos del cliente</h1>
        <p>
          Estos datos pertenecen al estado global y permanecen disponibles
          mientras navegas entre las vistas.
        </p>
      </div>

      <div className="contact-grid">
        <form className="card contact-form" onSubmit={manejarEnvio}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              id="correo"
              name="correo"
              type="email"
              value={formulario.correo}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono</label>
            <input
              id="telefono"
              name="telefono"
              value={formulario.telefono}
              onChange={manejarCambio}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <textarea
              id="direccion"
              name="direccion"
              value={formulario.direccion}
              onChange={manejarCambio}
              rows="4"
              required
            />
          </div>

          <div className="card-actions">
            <button type="submit" className="button">
              Guardar datos
            </button>

            <button
              type="button"
              className="button secondary"
              onClick={limpiarFormulario}
            >
              Limpiar
            </button>
          </div>

          {enviado && (
            <p className="success-message">
              Datos guardados correctamente en el estado global.
            </p>
          )}
        </form>

        <aside className="card">
          <p className="eyebrow">COMPRA ACTUAL</p>
          <h2>Resumen</h2>
          <p>Productos en carrito: {carrito.length}</p>
          <p>
            Total: ${totalCarrito.toLocaleString("es-CO")}
          </p>
          <p className="info-box">
            En esta sesión el objetivo principal es estudiar persistencia
            local. El envío real de datos a un servidor se trabajará con APIs.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Contacto;
