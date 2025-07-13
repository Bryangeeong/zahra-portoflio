import { CLOUDINARY, IMAGE_DIMENSIONS } from '../constants'

// Cloudinary configuration
const CLOUD_NAME = CLOUDINARY.CLOUD_NAME
const BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

// Helper function to generate optimized image URLs
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = IMAGE_DIMENSIONS.DEFAULT_WIDTH,
    height = IMAGE_DIMENSIONS.DEFAULT_HEIGHT,
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
    width: IMAGE_DIMENSIONS.THUMBNAIL_WIDTH,
    height: IMAGE_DIMENSIONS.THUMBNAIL_HEIGHT,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  })
}

// Helper for full-size modal URLs
export const getFullSizeUrl = (publicId) => {
  return getOptimizedImageUrl(publicId, {
    width: IMAGE_DIMENSIONS.FULL_SIZE_WIDTH,
    height: IMAGE_DIMENSIONS.FULL_SIZE_HEIGHT,
    crop: 'fit',
    quality: 'auto',
    format: 'auto'
  })
}