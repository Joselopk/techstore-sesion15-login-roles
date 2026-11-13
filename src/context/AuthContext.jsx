import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Usuarios demostrativos. En producción nunca se deben guardar contraseñas
// en el frontend: la autenticación debe validarse en un backend.
const usuariosDemo = [
  { id: 1, nombre: "Administrador TechStore", correo: "admin@techstore.com", password: "Admin123", rol: "administrador" },
  { id: 2, nombre: "Cliente TechStore", correo: "cliente@techstore.com", password: "Cliente123", rol: "cliente" }
];

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = sessionStorage.getItem("techstore_usuario");
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  const iniciarSesion = (correo, password) => {
    const encontrado = usuariosDemo.find(
      (item) => item.correo.toLowerCase() === correo.trim().toLowerCase()
        && item.password === password
    );

    if (!encontrado) return { correcto: false, mensaje: "Correo o contraseña incorrectos." };

    const datosPublicos = {
      id: encontrado.id,
      nombre: encontrado.nombre,
      correo: encontrado.correo,
      rol: encontrado.rol
    };
    sessionStorage.setItem("techstore_usuario", JSON.stringify(datosPublicos));
    setUsuario(datosPublicos);
    return { correcto: true };
  };

  const cerrarSesion = () => {
    sessionStorage.removeItem("techstore_usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion, autenticado: Boolean(usuario) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  return contexto;
}
