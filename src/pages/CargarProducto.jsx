import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import Toast from "../components/Toast";

function CargarProducto() {
  const { agregarProductoCatalogo } = useContext(FormularioContext);
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("Accesorios");
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!archivo) { setVistaPrevia(""); return undefined; }
    const url = URL.createObjectURL(archivo);
    setVistaPrevia(url);
    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  const seleccionarImagen = (evento) => {
    const seleccion = evento.target.files?.[0];
    setError("");
    if (!seleccion) return;
    const formatos = ["image/jpeg", "image/png", "image/webp"];
    if (!formatos.includes(seleccion.type)) {
      setError("Formato no permitido. Selecciona JPG, PNG o WEBP.");
      evento.target.value = "";
      return;
    }
    if (seleccion.size > 2 * 1024 * 1024) {
      setError("La imagen supera el límite de 2 MB.");
      evento.target.value = "";
      return;
    }
    setArchivo(seleccion);
  };

  const registrar = (evento) => {
    evento.preventDefault();
    setError("");
    if (!archivo) { setError("Selecciona una fotografía del producto."); return; }
    const lector = new FileReader();
    lector.onload = () => {
      agregarProductoCatalogo({
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number(precio),
        categoria,
        imagen: lector.result
      });
      setToast("Producto registrado y agregado al catálogo compartido.");
      setTimeout(() => navigate("/interfaces"), 700);
    };
    lector.onerror = () => setError("No fue posible leer el archivo seleccionado.");
    lector.readAsDataURL(archivo);
  };

  return (
    <section className="page upload-page">
      <div className="page-heading">
        <p className="eyebrow">SESIÓN 14 · FILE API + FORMS</p>
        <h1>Registrar producto</h1>
        <p>Selecciona una fotografía, valida el archivo y crea un producto que podrás utilizar en el catálogo, el modal, las pestañas, el dropdown y el acordeón.</p>
      </div>
      <div className="upload-layout">
        <form className="card upload-form" onSubmit={registrar}>
          <label>Nombre del producto
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} required minLength="2" placeholder="Ej. Audífonos inalámbricos"/>
          </label>
          <label>Descripción
            <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required rows="4" placeholder="Describe las características principales"/>
          </label>
          <div className="upload-fields">
            <label>Precio (COP)
              <input type="number" min="1" step="1" value={precio} onChange={(e) => setPrecio(e.target.value)} required placeholder="250000"/>
            </label>
            <label>Categoría
              <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option>Computadores</option><option>Dispositivos móviles</option><option>Pantallas</option><option>Accesorios</option><option>Audio</option>
              </select>
            </label>
          </div>
          <label className="upload-file-label">Fotografía del producto
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={seleccionarImagen}/>
            <small>Formatos JPG, PNG o WEBP. Tamaño máximo: 2 MB.</small>
          </label>
          {error && <p className="upload-error" role="alert">{error}</p>}
          <div className="upload-actions">
            <button className="button" type="submit">Registrar producto</button>
            <button className="button secondary" type="button" onClick={() => {setNombre("");setDescripcion("");setPrecio("");setCategoria("Accesorios");setArchivo(null);setError("");}}>Limpiar</button>
          </div>
        </form>
        <aside className="card upload-preview">
          <p className="eyebrow">VISTA PREVIA</p>
          {vistaPrevia ? <img src={vistaPrevia} alt="Vista previa del producto"/> : <div className="upload-placeholder"><span>＋</span><p>La imagen seleccionada aparecerá aquí</p></div>}
          <h2>{nombre || "Nombre del producto"}</h2>
          <p>{descripcion || "La descripción se mostrará en la ficha del producto."}</p>
          <strong>{precio ? `$${Number(precio).toLocaleString("es-CO")}` : "$0"}</strong>
          {archivo && <small>{archivo.name} · {(archivo.size / 1024).toFixed(1)} KB</small>}
        </aside>
      </div>
      <div className="upload-note"><strong>¿Qué ocurre al registrar?</strong><p>La imagen se convierte a Data URL para conservarla en el catálogo del navegador. No se sube a un servidor. El catálogo se comparte mediante Context API y se persiste en localStorage para esta práctica.</p></div>
      <Link to="/interfaces" className="upload-back">← Volver a Interfaces modernas</Link>
      <Toast mensaje={toast} cerrar={() => setToast("")}/>
    </section>
  );
}
export default CargarProducto;
