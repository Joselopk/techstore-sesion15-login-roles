import { useState } from "react";

function Tabs({ items }) {
  const [activo, setActivo] = useState(0);

  return (
    <section className="tabs-component">
      <div className="tabs-list" role="tablist" aria-label="Información">
        {items.map((item, indice) => (
          <button
            key={item.titulo}
            type="button"
            role="tab"
            aria-selected={activo === indice}
            className={`tab-button ${activo === indice ? "active" : ""}`}
            onClick={() => setActivo(indice)}
          >
            {item.titulo}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        {items[activo]?.contenido}
      </div>
    </section>
  );
}

export default Tabs;
