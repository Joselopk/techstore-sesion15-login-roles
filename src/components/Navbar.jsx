import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cantidadProductos } = useContext(FormularioContext);
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    cerrarSesion();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <NavLink to="/" className="brand">TechStore</NavLink>
        <div className="nav-links">
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <NavLink to="/interfaces">Interfaces</NavLink>
          {usuario?.rol === "administrador" && <NavLink to="/productos/nuevo">Registrar producto</NavLink>}
          <NavLink to="/productos">🛒 Carrito ({cantidadProductos})</NavLink>
          {usuario ? (
            <>
              <span className="nav-user">{usuario.nombre} · {usuario.rol}</span>
              <button type="button" className="nav-logout" onClick={salir}>Cerrar sesión</button>
            </>
          ) : <NavLink to="/login">Iniciar sesión</NavLink>}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
