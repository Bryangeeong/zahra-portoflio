import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="photographer-name">
          <a href="#top" className="name-link">Zahra Ghoncheh</a>
        </h1>
        <nav className="navigation">
          <a href="#about" className="nav-link">About</a>
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  )
}

export default Header