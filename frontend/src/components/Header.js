import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="navbar">
        <div className="navbar-brand">KANISTECH</div>
        <div className="nav-links">
          <a href="/" className="active">Inicio</a>
          <a href="/about">Nosotros</a>
          <a href="/Contact">Contact</a>
          <a href="/login" className="client-area">Área de Clientes</a>  {/* Modificación aquí */}
          <a href="/login_admi" className="client-area">Área de Admis</a> 
        </div>
      </div>
    </header>
  );
}

export default Header;
