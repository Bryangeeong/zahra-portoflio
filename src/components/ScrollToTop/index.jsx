import { useState, useEffect, memo, useCallback } from 'react'
import { THRESHOLDS, CONSTANTS, UI_CONFIG } from '../../constants'
import './ScrollToTop.css'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    if (window.pageYOffset > THRESHOLDS.SCROLL_TO_TOP_THRESHOLD) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [toggleVisibility])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: CONSTANTS.SCROLL_BEHAVIOR_SMOOTH
    })
  }, [])

  return (
    <>
      {isVisible && (
        <button 
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <svg width={UI_CONFIG.ICON_SIZE} height={UI_CONFIG.ICON_SIZE} viewBox="0 0 24 24" fill={CONSTANTS.SVG_FILL_CURRENT}>
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </button>
      )}
    </>
  )
}

export default memo(ScrollToTop)