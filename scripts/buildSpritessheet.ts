// @ts-nocheck
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const spritesmith = require('spritesmith');

const imagesDir = path.resolve(__dirname, '../badgesOriginal');
const resizeDir = path.resolve(__dirname, '../badgesSmaller');
const outputDir = path.resolve(__dirname, '../public/sprites');
const isPngOutput = true;
const outputExt = isPngOutput ? '.png' : '.jpg';

const size = 504; // same size as the original

// Function to resize and save image
async function resizeAndSaveImage(imagePath, outputDir) {
  try {
    // Resize image to 400x400px
    const resizedImageBuffer = await sharp(imagePath)
      .resize({ width: size, height: size })
      // .jpeg({ quality: 60 })
      .toBuffer();

    // Generate output file path
    const filename = path.basename(imagePath).replace(/\.\w+$/, outputExt);
    const outputFilePath = path.join(resizeDir, filename);

    // Save resized image
    fs.writeFileSync(outputFilePath, resizedImageBuffer);

    return outputFilePath;
  } catch (error) {
    console.error(`Error resizing image ${imagePath}:`, error);
    return null;
  }
}

fs.readdir(imagesDir, async (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    return;
  }

  // Filter out only image files
  const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|gif)$/.test(file));

  // Array to hold paths of resized images
  const resizedImagePaths = [];

  // Resize and save each image
  for (const file of imageFiles) {
    const imagePath = path.join(imagesDir, file);
    const resizedImagePath = await resizeAndSaveImage(imagePath, outputDir);
    if (resizedImagePath) {
      resizedImagePaths.push(resizedImagePath);
    }
  }

  // Generate spritesheet from resized images
  spritesmith.run({ src: resizedImagePaths }, (err, result) => {
    if (err) {
      console.error('Error generating spritesheet:', err);
      return;
    }

    // Write spritesheet image as JPG
    const spritesheetFilePath = path.join(outputDir, 'spritesheet' + outputExt);
    // turn into jpg
    sharp(result.image)
      // .jpeg({ quality: 60 })
      .toBuffer()
      .then((buffer) => {
        fs.writeFileSync(spritesheetFilePath, buffer);
        console.log('Spritesheet generated successfully!');
      })
      .catch((err) => {
        console.error('Error saving spritesheet as JPG:', err);
      });

    // Write spritesheet metadata

    fs.writeFileSync(
      path.join(outputDir, 'spritesheet.json'),
      JSON.stringify(
        Object.fromEntries([
          [
            'metadata',
            {
              width: size,
              height: size,
              fullWidth: result.properties.width,
              fullHeight: result.properties.height,
              columns: Math.round(result.properties.width / size),
              rows: Math.round(result.properties.height / size),
            },
          ],
          ...Object.entries(result.coordinates).map(([file, coords]) => [
            path
              .basename(file)
              .split('/')
              .at(-1)
              .replace(/\.\w+$/, ''),
            [Math.round(coords.x / size), Math.round(coords.y / size)], //, coords.width, coords.height], for now... all are 300x300
          ]),
        ])
      )
    );

    console.log('Spritesheet generated successfully!');
  });
});
