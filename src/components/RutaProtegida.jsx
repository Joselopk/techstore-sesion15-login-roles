import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Si no hay sesión o el rol no está autorizado, se muestra la ruta 404.
function RutaProtegida({ children, rolesPermitidos = [] }) {
  const { usuario } = useAuth();

  if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/404" replace />;
  }

  return children;
}

export default RutaProtegida;
