// Application Constants
// Centralized location for all hardcoded values, thresholds, and configuration

// Animation & Timing Constants
export const TIMING = {
  TEXT_ROTATION_INTERVAL: 2500,
  TOOLTIP_INITIAL_DELAY: 1000,
  TOOLTIP_DISPLAY_DURATION: 6000,
  TOOLTIP_EXIT_ANIMATION_DURATION: 800,
  NAVIGATION_SCROLL_DELAY: 100,
  CAMERA_FLASH_DURATION: 200,
}

// Scroll & Threshold Constants
export const THRESHOLDS = {
  SCROLL_TO_TOP_THRESHOLD: 300,
}

// Gallery Configuration
export const GALLERY = {
  ITEM_WIDTH: 320,
  SCROLL_SPEED: 1,
}

// Image Dimensions (Cloudinary)
export const IMAGE_DIMENSIONS = {
  DEFAULT_WIDTH: 400,
  DEFAULT_HEIGHT: 600,
  THUMBNAIL_WIDTH: 300,
  THUMBNAIL_HEIGHT: 400,
  FULL_SIZE_WIDTH: 1200,
  FULL_SIZE_HEIGHT: 1600,
  VIDEO_WIDTH: 1920,
  VIDEO_HEIGHT: 1080,
}

// Z-Index Constants (organized by layer priority)
export const Z_INDEX = {
  BACKGROUND: 1,
  CONTENT: 2,
  OVERLAY: 3,
  HEADER: 1000,
  TOOLTIP: 1001,
  MODAL: 2000,
  MODAL_CLOSE: 2001,
  FILM_EFFECTS_BASE: 9994,
  FILM_FLICKER: 9996,
  FILM_SCRATCHES: 9997,
  FILM_GRAIN: 9998,
  FILM_DUST: 9999,
  CAMERA_FLASH: 99999,
}

// API Endpoints & External URLs
export const URLS = {
  CONTACT_FORM_ENDPOINT: "https://formspree.io/f/mrbknroq",
  INSTAGRAM_URL: "https://www.instagram.com/zaragh_photo/",
  LINKEDIN_URL: "https://www.linkedin.com/in/zahra-ghoncheh-33244319b/",
}

// Cloudinary Configuration
export const CLOUDINARY = {
  CLOUD_NAME: "dvalrc5nr",
}

// UI Configuration Constants
export const UI_CONFIG = {
  TEXTAREA_ROWS: 5,
  ICON_SIZE: 24,
}

// Common String Values
export const CONSTANTS = {
  SCROLL_BEHAVIOR_SMOOTH: "smooth",
  SVG_FILL_CURRENT: "currentColor",
  CONTENT_TYPE_JSON: "application/json",
}