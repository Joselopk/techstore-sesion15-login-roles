import Navbar from "./Navbar";

function Header() {
  return (
    <>
      <header className="site-header">
        <div className="container header-content">
          <div>
            <p className="eyebrow">TIENDA DE TECNOLOGÍA</p>
            <h1>TechStore</h1>
            <p>Aplicaciones Web con React</p>
          </div>
        </div>
      </header>

      <Navbar />
    </>
  );
}

export default Header;
