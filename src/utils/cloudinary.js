// Cloudinary configuration
const CLOUD_NAME = 'dvalrc5nr'
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

// Helper function to generate optimized image URLs
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 400,
    height = 600,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options

  // Build transformation string
  const transformations = []
  if (width && height) {
    transformations.push(`w_${width},h_${height},c_${crop}`)
  }
  if (quality) {
    transformations.push(`q_${quality}`)
  }
  if (format) {
    transformations.push(`f_${format}`)
  }

  const transformString = transformations.length > 0 ? `/${transformations.join(',')}` : ''
  
  return `${BASE_URL}${transformString}/${publicId}`
}

// Helper for thumbnail URLs
export const getThumbnailUrl = (publicId) => {
  return getOptimizedImageUrl(publicId, {
    width: 300,
    height: 400,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  })
}

// Helper for full-size modal URLs
export const getFullSizeUrl = (publicId) => {
  return getOptimizedImageUrl(publicId, {
    width: 1200,
    height: 1600,
    crop: 'fit',
    quality: 'auto',
    format: 'auto'
  })
}