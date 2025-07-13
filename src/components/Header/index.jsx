import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, memo } from 'react'
import { useFilmEffects } from '../../hooks/useFilmEffects'
import { TIMING, CONSTANTS } from '../../constants'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { filmEffectsEnabled, toggleFilmEffects } = useFilmEffects()
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipExiting, setTooltipExiting] = useState(false)

  useEffect(() => {
    // Show tooltip on page load, hide after configured duration
    const timer = setTimeout(() => {
      setShowTooltip(true)
      const hideTimer = setTimeout(() => {
        setTooltipExiting(true)
        // Remove tooltip after exit animation completes
        setTimeout(() => {
          setShowTooltip(false)
          setTooltipExiting(false)
        }, TIMING.TOOLTIP_EXIT_ANIMATION_DURATION)
      }, TIMING.TOOLTIP_DISPLAY_DURATION)
      return () => clearTimeout(hideTimer)
    }, TIMING.TOOLTIP_INITIAL_DELAY)
    
    return () => clearTimeout(timer)
  }, [])

  const handleTitleClick = (e) => {
    e.preventDefault()
    if (location.pathname === '/') {
      // If on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH })
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
                document.getElementById('about')?.scrollIntoView({ behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH })
                }, TIMING.NAVIGATION_SCROLL_DELAY)
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
                document.getElementById('gallery')?.scrollIntoView({ behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('gallery')?.scrollIntoView({ behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH })
                }, TIMING.NAVIGATION_SCROLL_DELAY)
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
                document.getElementById('contact')?.scrollIntoView({ behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH })
              } else {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH })
                }, TIMING.NAVIGATION_SCROLL_DELAY)
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

export default memo(Header)