import { useState, useEffect, useRef } from 'react'
import { galleryImages } from '../../data/galleryImages'
import { getThumbnailUrl, getFullSizeUrl } from '../../utils/cloudinary'
import './Gallery.css'

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const carouselRef = useRef(null)

  // Process gallery images with Cloudinary URLs
  const processedImages = galleryImages.map(image => ({
    ...image,
    thumbnailSrc: getThumbnailUrl(image.publicId),
    fullSizeSrc: getFullSizeUrl(image.publicId)
  }))

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % processedImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoScrolling, processedImages.length])

  // Scroll to centered image
  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current
      const itemWidth = 320 // 300px width + 20px gap
      const containerWidth = carousel.offsetWidth
      const scrollPosition = (currentIndex * itemWidth) - (containerWidth / 2) + (itemWidth / 2)
      
      carousel.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [currentIndex])

  // Handle manual scroll to update current index
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let scrollTimeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const itemWidth = 320
        const containerWidth = carousel.offsetWidth
        const scrollLeft = carousel.scrollLeft
        const centerPosition = scrollLeft + (containerWidth / 2)
        const newIndex = Math.round(centerPosition / itemWidth)
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < processedImages.length) {
          setCurrentIndex(newIndex)
          setIsAutoScrolling(false)
          setTimeout(() => setIsAutoScrolling(true), 8000)
        }
      }, 150) // Debounce for 150ms
    }

    carousel.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      carousel.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [currentIndex, processedImages.length])

  const goToPrevious = () => {
    setIsAutoScrolling(false)
    setCurrentIndex(prev => prev === 0 ? processedImages.length - 1 : prev - 1)
    setTimeout(() => setIsAutoScrolling(true), 8000) // Resume auto-scroll after 8 seconds
  }

  const goToNext = () => {
    setIsAutoScrolling(false)
    setCurrentIndex(prev => (prev + 1) % processedImages.length)
    setTimeout(() => setIsAutoScrolling(true), 8000) // Resume auto-scroll after 8 seconds
  }

  const openModal = (image) => {
    setSelectedImage(image)
    setIsImageLoading(true)
    // Prevent background scrolling
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    setIsImageLoading(false)
    // Restore background scrolling
    document.body.style.overflow = 'unset'
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  // Cleanup: restore scrolling if component unmounts with modal open
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
          <button 
            className="carousel-arrow carousel-arrow-left" 
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ‹
          </button>
          
          <div className="gallery-grid" ref={carouselRef}>
            {processedImages.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item ${index === currentIndex ? 'gallery-item-active' : ''}`}
                onClick={() => openModal(image)}
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
            ))}
          </div>
          
          <button 
            className="carousel-arrow carousel-arrow-right" 
            onClick={goToNext}
            aria-label="Next image"
          >
            ›
          </button>
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