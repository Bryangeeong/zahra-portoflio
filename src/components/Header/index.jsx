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
          <a 
            href="#about" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              if (location.pathname === '/') {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }
            }}
          >
            About
          </a>
          <a 
            href="#gallery" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              if (location.pathname === '/') {
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }
            }}
          >
            Gallery
          </a>
          <a href="#/portfolio" className="nav-link">Portfolio</a>
          <a 
            href="#contact" 
            className="nav-link"
            onClick={(e) => {
              e.preventDefault()
              if (location.pathname === '/') {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header