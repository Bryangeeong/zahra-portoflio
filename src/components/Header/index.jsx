import { useNavigate, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleTitleClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      // If on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // If on another page, navigate to home
      navigate('/')
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="photographer-name">
          <button onClick={handleTitleClick} className="name-link">Zahra Ghoncheh</button>
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