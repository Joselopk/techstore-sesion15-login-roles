import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { iniciarSesion, usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (usuario) {
    return <section className="page"><div className="card auth-card"><h1>Ya tienes una sesión iniciada</h1><p>Has ingresado como {usuario.rol}.</p><Link className="button" to="/">Ir al inicio</Link></div></section>;
  }

  const enviar = (evento) => {
    evento.preventDefault();
    setError("");
    const resultado = iniciarSesion(correo, password);
    if (!resultado.correcto) {
      setError(resultado.mensaje);
      return;
    }
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <section className="page auth-page">
      <div className="auth-card card">
        <p className="eyebrow">ACCESO A TECHSTORE</p>
        <h1>Iniciar sesión</h1>
        <p>Ingresa con una cuenta de cliente o administrador.</p>
        <form className="auth-form" onSubmit={enviar}>
          <label>Correo electrónico
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required autoComplete="username" placeholder="usuario@techstore.com"/>
          </label>
          <label>Contraseña
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Ingresa tu contraseña"/>
          </label>
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="button" type="submit">Ingresar</button>
        </form>
        <div className="demo-credentials">
          <h2>Usuarios de demostración</h2>
          <div><strong>Administrador</strong><span>admin@techstore.com</span><code>Admin123</code></div>
          <div><strong>Cliente</strong><span>cliente@techstore.com</span><code>Cliente123</code></div>
        </div>
        <Link to="/" className="auth-back">Volver a la tienda</Link>
      </div>
    </section>
  );
}

export default Login;
