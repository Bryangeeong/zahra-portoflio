import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react'
import { getThumbnailUrl, getFullSizeUrl } from '../../utils/cloudinary'
import './Portfolio.css'

function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [portfolioImages, setPortfolioImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [displayedImages, setDisplayedImages] = useState([])
  const [page, setPage] = useState(1)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const [loadedImages, setLoadedImages] = useState(new Set())
  const dropdownRef = useRef(null)
  
  const IMAGES_PER_PAGE = 12

  const categories = {
    all: 'Photography',
    landscape: 'Landscape',
    event: 'Events', 
    portrait: 'Portraits'
  }

  const isSubcategory = (key) => key !== 'all'

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setIsDropdownOpen(false)
    
    // Don't reset loaded images - let them persist to avoid race conditions
  }

  // Load portfolio images
  useEffect(() => {
    const loadPortfolioImages = async () => {
      try {
        const { portfolioImages } = await import('../../data/portfolioImages.js')
        setPortfolioImages(portfolioImages)
      } catch (error) {
        console.error('Error loading portfolio images:', error)
        setPortfolioImages([])
      } finally {
        setLoading(false)
      }
    }
    
    loadPortfolioImages()
  }, [])

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'all') {
      return portfolioImages
    }
    return portfolioImages.filter(image => 
      image.tags.includes(selectedCategory)
    )
  }, [portfolioImages, selectedCategory])

  // Reset pagination when category changes
  useEffect(() => {
    setPage(1)
    setDisplayedImages(filteredImages.slice(0, IMAGES_PER_PAGE))
  }, [filteredImages])

  // Load more images for infinite scroll
  const loadMoreImages = () => {
    const nextPage = page + 1
    const startIndex = (nextPage - 1) * IMAGES_PER_PAGE
    const endIndex = startIndex + IMAGES_PER_PAGE
    const newImages = filteredImages.slice(startIndex, endIndex)
    
    if (newImages.length > 0) {
      setDisplayedImages(prev => [...prev, ...newImages])
      setPage(nextPage)
    }
  }

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        loadMoreImages()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [page, filteredImages])

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

  const handlePortfolioImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]))
  }


  // Cleanup
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
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
        
        {loading ? (
          <div className="portfolio-loading">
            <p>Loading portfolio...</p>
          </div>
        ) : displayedImages.length > 0 ? (
          <div className="portfolio-gallery">
            {displayedImages.map((image, index) => {
              const isImageLoaded = loadedImages.has(image.id)
              return (
                <div
                  key={image.id}
                  className="portfolio-item"
                  onClick={() => openModal(image)}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {!isImageLoaded && (
                    <div className="portfolio-skeleton" />
                  )}
                  <img
                    src={getThumbnailUrl(image.publicId)}
                    alt={`Portfolio image - ${image.tags.join(', ')}`}
                    className={`portfolio-image ${isImageLoaded ? 'loaded' : ''}`}
                    loading="lazy"
                    onLoad={() => handlePortfolioImageLoad(image.id)}
                    onError={() => handlePortfolioImageLoad(image.id)}
                  />
                  <div className="portfolio-overlay">
                    <span className="portfolio-view">View</span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="portfolio-empty">
            <p>No images found for {categories[selectedCategory].toLowerCase()}.</p>
            <p>Try running <code>npm run generate-portfolio</code> to fetch the latest images.</p>
          </div>
        )}
        
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
                src={getFullSizeUrl(selectedImage.publicId)}
                alt={`Portfolio image - ${selectedImage.tags.join(', ')}`}
                className={`modal-image ${isImageLoading ? 'modal-image-loading' : ''}`}
                onLoad={handleImageLoad}
                onError={() => setIsImageLoading(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Portfolio)