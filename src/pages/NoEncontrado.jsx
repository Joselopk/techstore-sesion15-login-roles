import { Link } from "react-router-dom";

function NoEncontrado() {
  return (
    <section className="card page not-found">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La ruta solicitada no existe.</p>
      <Link to="/" className="button">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NoEncontrado;
