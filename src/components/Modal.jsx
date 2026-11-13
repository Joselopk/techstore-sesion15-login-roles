import { useEffect } from "react";

function Modal({ abierto, cerrar, titulo, children }) {
  useEffect(() => {
    if (!abierto) return undefined;

    const manejarTecla = (evento) => {
      if (evento.key === "Escape") cerrar();
    };

    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [abierto, cerrar]);

  if (!abierto) return null;

  return (
    <div className="modal-overlay" onMouseDown={cerrar}>
      <section
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="modal-title">{titulo}</h2>
          <button className="icon-button" type="button" onClick={cerrar} aria-label="Cerrar ventana">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </section>
    </div>
  );
}

export default Modal;
