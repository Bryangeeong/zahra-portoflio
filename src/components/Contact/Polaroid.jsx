import './Polaroid.css'

function Polaroid({ isVisible, onClose }) {
  if (!isVisible) return null

  return (
    <div className="polaroid-overlay">
      <div className="polaroid">
        <div className="polaroid-photo">
          <div className="photo-content">
            <div className="thank-you-icon">📸</div>
            <h3 className="thank-you-title">Message Captured!</h3>
            <p className="thank-you-text">
              Thanks for reaching out! Your message has been received and I'll get back to you soon.
            </p>
            <div className="photo-details">
              <div className="photo-timestamp">
                {new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="polaroid-footer">
          <div className="polaroid-brand">Zahra Photography</div>
        </div>
        <button 
          className="polaroid-close" 
          onClick={onClose}
          aria-label="Close polaroid"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Polaroid