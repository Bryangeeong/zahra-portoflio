import { useState } from 'react'
import './Gallery.css'

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  const sampleImages = [
    { id: 1, src: '/api/placeholder/400/600', alt: 'Portrait Photography 1' },
    { id: 2, src: '/api/placeholder/600/400', alt: 'Landscape Photography 1' },
    { id: 3, src: '/api/placeholder/400/600', alt: 'Portrait Photography 2' },
    { id: 4, src: '/api/placeholder/600/400', alt: 'Nature Photography 1' },
    { id: 5, src: '/api/placeholder/400/600', alt: 'Portrait Photography 3' },
    { id: 6, src: '/api/placeholder/600/400', alt: 'Architecture Photography 1' },
    { id: 7, src: '/api/placeholder/400/600', alt: 'Portrait Photography 4' },
    { id: 8, src: '/api/placeholder/600/400', alt: 'Street Photography 1' },
    { id: 9, src: '/api/placeholder/400/600', alt: 'Portrait Photography 5' },
  ]

  const openModal = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-content">
        <h2 className="gallery-title">Portfolio</h2>
        <div className="gallery-grid">
          {sampleImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <span className="gallery-view">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery