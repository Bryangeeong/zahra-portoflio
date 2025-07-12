// Run this script to fetch gallery images from Cloudinary
// You'll need to install: npm install cloudinary

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (you'll need your credentials)
cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_API_SECRET'
});

async function fetchGalleryImages() {
  try {
    const result = await cloudinary.search
      .expression('folder:zahra-portfolio AND tags:gallery')
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute();

    const images = result.resources.map(image => ({
      publicId: image.public_id,
      url: cloudinary.url(image.public_id, {
        transformation: [
          { width: 400, height: 600, crop: 'fill', quality: 'auto', format: 'auto' }
        ]
      }),
      thumbnailUrl: cloudinary.url(image.public_id, {
        transformation: [
          { width: 300, height: 400, crop: 'fill', quality: 'auto', format: 'auto' }
        ]
      }),
      title: image.filename || 'Untitled',
      tags: image.tags
    }));

    console.log('Gallery Images:');
    console.log(JSON.stringify(images, null, 2));
    
    // Save to file
    const fs = require('fs');
    fs.writeFileSync('./src/data/galleryImages.json', JSON.stringify(images, null, 2));
    console.log('Images saved to ./src/data/galleryImages.json');

  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

fetchGalleryImages();