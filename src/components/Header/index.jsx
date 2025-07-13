import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFilmEffects } from '../../contexts/FilmEffectsContext'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { filmEffectsEnabled, toggleFilmEffects } = useFilmEffects()
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipExiting, setTooltipExiting] = useState(false)

  useEffect(() => {
    // Show tooltip on page load, hide after 6 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true)
      const hideTimer = setTimeout(() => {
        setTooltipExiting(true)
        // Remove tooltip after exit animation completes
        setTimeout(() => {
          setShowTooltip(false)
          setTooltipExiting(false)
        }, 800)
      }, 6000)
      return () => clearTimeout(hideTimer)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

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
          <div className="film-toggle-container">
            <button 
              onClick={toggleFilmEffects}
              className="film-toggle"
              title={filmEffectsEnabled ? "Disable film effects" : "Enable film effects"}
            >
              {filmEffectsEnabled ? "🎞️" : "📷"}
            </button>
            {showTooltip && (
              <div className={`film-toggle-tooltip ${tooltipExiting ? 'exiting' : ''}`}>
                Too much vintage? Toggle here!
                <div className="tooltip-arrow"></div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header