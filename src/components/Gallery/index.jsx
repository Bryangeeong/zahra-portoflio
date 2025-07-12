import { useState, useEffect, useRef } from 'react'
import { galleryImages } from '../../data/galleryImages'
import { getThumbnailUrl, getFullSizeUrl } from '../../utils/cloudinary'
import './Gallery.css'

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const carouselRef = useRef(null)

  // Process gallery images with Cloudinary URLs
  const processedImages = galleryImages.map(image => ({
    ...image,
    thumbnailSrc: getThumbnailUrl(image.publicId),
    fullSizeSrc: getFullSizeUrl(image.publicId)
  }))

  // Create seamless infinite carousel by duplicating images
  const infiniteImages = [
    ...processedImages,
    ...processedImages,
    ...processedImages
  ]

  // Continuous smooth scrolling
  useEffect(() => {
    if (processedImages.length === 0) return

    const carousel = carouselRef.current
    if (!carousel) return

    const itemWidth = 320 // 300px width + 20px gap
    const maxScroll = processedImages.length * itemWidth
    
    // Start from the middle section
    carousel.scrollLeft = maxScroll
    let scrollPosition = maxScroll

    const scroll = () => {
      scrollPosition += 1
      
      // Reset before reaching the end to maintain seamless loop
      if (scrollPosition >= maxScroll * 2) {
        scrollPosition = maxScroll
      }
      
      carousel.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 16) // ~60fps
    return () => clearInterval(intervalId)
  }, [processedImages.length])



  const openModal = (image) => {
    setSelectedImage(image)
    setIsImageLoading(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    setIsImageLoading(false)
    document.body.style.overflow = 'unset'
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  // Cleanup
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-content">
        <h2 className="gallery-title">Gallery</h2>
        <div className="gallery-carousel-container">
          <div className="gallery-grid" ref={carouselRef}>
            {/* Top film strip */}
            <div className="film-strip film-strip-top">
              {infiniteImages.map((_, index) => (
                <div key={`top-${index}`} className="film-strip-segment"></div>
              ))}
            </div>
            
            {/* Images */}
            <div className="gallery-images-row">
              {infiniteImages.map((image, index) => {
                const originalIndex = index % processedImages.length
                
                return (
                  <div
                    key={`${image.id}-${index}`}
                    className="gallery-item"
                    onClick={() => openModal(processedImages[originalIndex])}
                  >
                    <img
                      src={image.thumbnailSrc}
                      alt={image.alt}
                      className="gallery-image"
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <span className="gallery-view">View</span>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Bottom film strip */}
            <div className="film-strip film-strip-bottom">
              {infiniteImages.map((_, index) => (
                <div key={`bottom-${index}`} className="film-strip-segment"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="gallery-actions">
          <a href="#/portfolio" className="view-portfolio-btn">
            View Full Portfolio
          </a>
        </div>
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            {isImageLoading && (
              <div className="modal-spinner">
                <div className="spinner"></div>
              </div>
            )}
            
            <img
              src={selectedImage.fullSizeSrc}
              alt={selectedImage.alt}
              className={`modal-image ${isImageLoading ? 'modal-image-loading' : ''}`}
              onLoad={handleImageLoad}
              onError={() => setIsImageLoading(false)}
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery