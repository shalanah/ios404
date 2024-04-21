const fs = require('fs').promises;

const folders = [
  'api',
  'svg/element',
  'svg/attribute',
  'css',
  'html/attributes',
  'html/element',
  'html/global_attributes',
  'manifest',
  'webdriver/commands',
  'http/headers',
];

// Did a sparse checkout and of the files/en-us/web/ folder lives in a sibling folder called mdn-contents
const localPath = '../mdn-contents/files/en-us/web/';
const outputFile = `./src/utils/mdn-content-full.json`;

async function processDirectory(path, folders = false) {
  const items = await fs.readdir(path, { withFileTypes: true });
  let markdownFiles = {};

  for (const item of items) {
    if (item.isFile() && item.name.endsWith('.md') && !folders) {
      const data = await fs.readFile(item.path + '/' + item.name, 'base64');
      // Basically just grabbing first paragraph of content... probably could clean this up more
      let parsedContent = Buffer.from(data, 'base64').toString('utf-8').trim();

      // Helping this match our bcd data
      let key = item.path.replace(localPath, '');

      if (parsedContent) markdownFiles[key] = parsedContent;
    } else if (folders && item.isDirectory()) {
      const nestedFiles = await processDirectory(
        item.path + '/' + item.name,
        false
      );
      markdownFiles = { ...markdownFiles, ...nestedFiles };
    }
  }

  return markdownFiles;
}

async function fetchMarkdownFiles() {
  let obj = {};

  for (const folder of folders) {
    const res = await processDirectory(localPath + folder, true);
    obj = { ...obj, ...res };
  }

  fs.writeFile(outputFile, JSON.stringify(obj, null, 2));
}

fetchMarkdownFiles();
