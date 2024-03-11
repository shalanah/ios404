// @ts-nocheck
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const spritesmith = require('spritesmith');

const imagesDir = path.resolve(__dirname, '../public/imgsOriginal');
const resizeDir = path.resolve(__dirname, '../public/imgsSmaller');
const outputDir = path.resolve(__dirname, '../public/sprites');

// Function to resize and save image
async function resizeAndSaveImage(imagePath, outputDir) {
  try {
    // Resize image to 400x400px
    const resizedImageBuffer = await sharp(imagePath)
      .resize({ width: 300, height: 300 })
      .toBuffer();

    // Generate output file path
    const filename = path.basename(imagePath);
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
    const spritesheetFilePath = path.join(outputDir, 'spritesheet.jpg');
    fs.writeFileSync(spritesheetFilePath, result.image, 'binary');

    // Write spritesheet metadata
    fs.writeFileSync(
      path.join(outputDir, 'spritesheet.json'),
      JSON.stringify(result.coordinates)
    );

    console.log('Spritesheet generated successfully!');
  });
});

// fs.readdir(imagesDir, (err, files) => {
//   if (err) {
//     console.error('Error reading images directory:', err);
//     return;
//   }

//   // Filter out only image files
//   const imageFiles = files.filter((file) => /\.(png|jpg|jpeg|gif)$/.test(file));

//   // Array to hold image buffers after resizing
//   const resizedImageBuffers = [];

//   // Resize images to 400x400px
//   Promise.all(
//     imageFiles.map((file) => {
//       console.log(file);
//       const imagePath = path.join(imagesDir, file);
//       return sharp(imagePath)
//         .resize({ width: 400, height: 400 })
//         .toBuffer()
//         .then((buffer) => {
//           resizedImageBuffers.push(buffer);
//         })
//         .catch((err) => {
//           console.error(`Error resizing image ${file}:`, err);
//         });
//     })
//   ).then(() => {
//     spritesmith.run({ src: resizedImageBuffers }, (err, result) => {
//       if (err) {
//         console.error('Error generating spritesheet:', err);
//         return;
//       }

//       // Write spritesheet image as JPG
//       const spritesheetFilePath = path.join(outputDir, 'spritesheet.jpg');
//       fs.writeFileSync(spritesheetFilePath, result.image, 'binary');

//       // Write spritesheet metadata
//       fs.writeFileSync(
//         path.join(outputDir, 'spritesheet.json'),
//         JSON.stringify(result.coordinates)
//       );

//       console.log('Spritesheet generated successfully!');
//       console.log('Saved at:', spritesheetFilePath);

//       // Generate spritesheet from resized images
//       // spritesmith.run({ src: resizedImageBuffers }, (err, result) => {
//       //   if (err) {
//       //     console.error('Error generating spritesheet:', err);
//       //     return;
//       //   }

//       //   // Write spritesheet image
//       //   fs.writeFileSync(path.join(outputDir, 'spritesheet.png'), result.image);

//       //   // Write spritesheet metadata
//       //   fs.writeFileSync(
//       //     path.join(outputDir, 'spritesheet.json'),
//       //     JSON.stringify(result.coordinates)
//       //   );

//       //   console.log('Spritesheet generated successfully!');
//     });
//   });
// });
