import { useEffect } from "react";

function Toast({ mensaje, tipo = "success", cerrar, duracion = 3000 }) {
  useEffect(() => {
    if (!mensaje) return undefined;
    const temporizador = window.setTimeout(cerrar, duracion);
    return () => window.clearTimeout(temporizador);
  }, [mensaje, cerrar, duracion]);

  if (!mensaje) return null;

  return (
    <div className={`toast-message toast-${tipo}`} role="status" aria-live="polite">
      <span>{mensaje}</span>
      <button type="button" onClick={cerrar} aria-label="Cerrar notificación">×</button>
    </div>
  );
}

export default Toast;
