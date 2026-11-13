import { useEffect, useRef, useState } from "react";

function Dropdown({ opciones, onSeleccionar }) {
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef(null);

  useEffect(() => {
    const cerrarFuera = (evento) => {
      if (contenedor.current && !contenedor.current.contains(evento.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", cerrarFuera);
    return () => document.removeEventListener("mousedown", cerrarFuera);
  }, []);

  return (
    <div className="dropdown-component" ref={contenedor}>
      <button
        type="button"
        className="button secondary"
        aria-expanded={abierto}
        onClick={() => setAbierto((valor) => !valor)}
      >
        Acciones <span aria-hidden="true">▾</span>
      </button>
      {abierto && (
        <ul className="dropdown-menu">
          {opciones.map((opcion) => (
            <li key={opcion}>
              <button
                type="button"
                onClick={() => {
                  onSeleccionar(opcion);
                  setAbierto(false);
                }}
              >
                {opcion}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
