import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RutaProtegida from "./components/RutaProtegida";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import NoEncontrado from "./pages/NoEncontrado";
import InterfacesModernas from "./pages/InterfacesModernas";
import CargarProducto from "./pages/CargarProducto";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<ProductoDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/interfaces" element={<InterfacesModernas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productos/nuevo" element={
            <RutaProtegida rolesPermitidos={["administrador"]}>
              <CargarProducto />
            </RutaProtegida>
          } />
          <Route path="/404" element={<NoEncontrado />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;
