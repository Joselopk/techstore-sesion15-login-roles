import { useState } from "react";

function Accordion({ items }) {
  const [abierto, setAbierto] = useState(null);

  return (
    <div className="accordion-component">
      {items.map((item, indice) => {
        const expandido = abierto === indice;
        const panelId = `accordion-panel-${indice}`;
        return (
          <section className="accordion-item" key={item.pregunta}>
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={expandido}
              aria-controls={panelId}
              onClick={() => setAbierto(expandido ? null : indice)}
            >
              {item.pregunta}
              <span aria-hidden="true">{expandido ? "−" : "+"}</span>
            </button>
            {expandido && <div className="accordion-panel" id={panelId}>{item.respuesta}</div>}
          </section>
        );
      })}
    </div>
  );
}

export default Accordion;
