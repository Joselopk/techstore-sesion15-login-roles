import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";

function ClienteActual() {
  const { formulario } = useContext(FormularioContext);

  const tieneDatos = Object.values(formulario).some(Boolean);

  return (
    <section className="card client-card">
      <h2>Cliente actual</h2>

      {tieneDatos ? (
        <>
          <p>
            <strong>Nombre:</strong> {formulario.nombre || "No registrado"}
          </p>
          <p>
            <strong>Correo:</strong> {formulario.correo || "No registrado"}
          </p>
        </>
      ) : (
        <p>No hay datos de cliente registrados.</p>
      )}
    </section>
  );
}

export default ClienteActual;
