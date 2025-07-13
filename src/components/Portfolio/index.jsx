import { useState, useEffect, useRef, memo } from 'react'
import './Portfolio.css'

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const categories = {
    all: 'Photography',
    landscape: 'Landscape',
    events: 'Events', 
    portraits: 'Portraits'
  }

  const isSubcategory = (key) => key !== 'all'

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setIsDropdownOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="portfolio-page">
      <div className="portfolio-content">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-subtitle">
          Welcome to my creative journey! Here you'll find a collection of moments I've had the privilege to capture.
        </p>
        
        <div className="portfolio-filter-section">
          <p className="filter-intro">Check out my</p>
          <div className="filter-dropdown" ref={dropdownRef}>
            <button 
              className="filter-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              {categories[selectedCategory]}
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {Object.entries(categories).map(([key, label]) => (
                  <button
                    key={key}
                    className={`dropdown-item ${selectedCategory === key ? 'selected' : ''} ${isSubcategory(key) ? 'subcategory' : ''}`}
                    onClick={() => handleCategoryChange(key)}
                  >
                    {isSubcategory(key) && <span className="subcategory-indicator">└</span>}
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Placeholder for full portfolio content */}
        <div className="portfolio-placeholder">
          <p>Portfolio gallery for {categories[selectedCategory].toLowerCase()} coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Portfolio)