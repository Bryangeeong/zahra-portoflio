import { memo } from 'react'
import './Portfolio.css'

function Portfolio() {
  return (
    <div className="portfolio-page">
      <div className="portfolio-content">
        <h1 className="portfolio-title">Portfolio</h1>
        <p className="portfolio-subtitle">
          Complete collection of work
        </p>
        
        {/* Placeholder for full portfolio content */}
        <div className="portfolio-placeholder">
          <p>Full portfolio gallery coming soon...</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Portfolio)