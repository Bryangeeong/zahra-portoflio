import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function generatePortfolioData() {
  try {
    console.log('🔍 Fetching portfolio images from Cloudinary...');
    
    // Search for all images in the zahra-portfolio folder
    const result = await cloudinary.search
      .expression('folder:zahra-portfolio')
      .sort_by('created_at', 'desc')
      .max_results(500)
      .with_field('tags')
      .execute();

    console.log(`📸 Found ${result.resources.length} images`);

    // Process and format the image data
    const portfolioImages = result.resources.map(image => {
      // Get tags from Cloudinary, or infer from filename if none exist
      let tags = image.tags || [];
      
      // If no tags, infer from filename
      if (tags.length === 0) {
        const filename = image.public_id.toLowerCase();
        if (filename.includes('landscape')) {
          tags = ['landscape'];
        } else if (filename.includes('portrait')) {
          tags = ['portrait'];
        } else if (filename.includes('event')) {
          tags = ['event'];
        }
      }
      
      console.log(`📷 ${image.public_id}: tags = ${JSON.stringify(tags)}`);
      
      return {
        id: image.public_id,
        publicId: image.public_id,
        width: image.width,
        height: image.height,
        format: image.format,
        createdAt: image.created_at,
        tags: tags
      };
    });

    // Create the portfolio data object
    const portfolioData = {
      lastUpdated: new Date().toISOString(),
      totalImages: portfolioImages.length,
      images: portfolioImages
    };

    // Write to JSON file in src/data
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'portfolioImages.js');
    const jsContent = `// Generated portfolio data - Last updated: ${new Date().toLocaleString()}
// Run 'npm run generate-portfolio' to update this file

export const portfolioImages = ${JSON.stringify(portfolioImages, null, 2)};

export const portfolioData = ${JSON.stringify(portfolioData, null, 2)};

export default portfolioImages;
`;

    fs.writeFileSync(outputPath, jsContent);

    console.log('✅ Portfolio data generated successfully!');
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📊 Total images: ${portfolioImages.length}`);
    
    // Show tag breakdown
    const tagCounts = {};
    portfolioImages.forEach(img => {
      img.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    console.log('🏷️  Tag breakdown:');
    Object.entries(tagCounts).forEach(([tag, count]) => {
      console.log(`   ${tag}: ${count} images`);
    });

  } catch (error) {
    console.error('❌ Error generating portfolio data:', error);
    process.exit(1);
  }
}

// Run the script
generatePortfolioData();