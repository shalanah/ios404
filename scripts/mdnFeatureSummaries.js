const fs = require('fs').promises;
const contentFull = require('../src/utils/mdn-content-full.json');

const outputFile = `./src/utils/mdn.json`;

// Macros from https://github.com/mdn/yari/kumascript --- looks like it will be deprecated soon :)
// Issues with...
// ALL THE HTTPS ONES (get text still check links etc)
// http://localhost:3000/?sourcesOff=caniuse#mdn-http-headers-Accept-CH
// http://localhost:3000/?sourcesOff=caniuse#mdn-http-headers-Attribution-Reporting-Eligible
// http://localhost:3000/?sourcesOff=caniuse#mdn-http-headers-Attribution-Reporting-Register-Source
// http://localhost:3000/?sourcesOff=caniuse#mdn-http-headers-Attribution-Reporting-Register-Trigger
// http://localhost:3000/?sourcesOff=caniuse#mdn-http-headers-Attribution-Reporting-Support
// http://localhost:3000/?sourcesOff=caniuse#mdn-http-headers-Critical-CH

// http://localhost:3000/?sourcesOff=caniuse#mdn-api-PageRevealEvent > BIG ISSUES
// http://localhost:3000/?sourcesOff=caniuse#mdn-api-PageSwapEvent > BIG ISSUES
// http://localhost:3000/?sourcesOff=caniuse#mdn-api-PaintRenderingContext2D
// http://localhost:3000/?sourcesOff=caniuse#mdn-api-PaintSize

// http://localhost:3000/?sourcesOff=caniuse#mdn-api-scheduler
// http://localhost:3000/?sourcesOff=caniuse#mdn-api-Scheduler // why 2?

function replaceTemplateTags(str) {
  return str.replace(
    /{{\s*(SVGAttr|HTMLElement|cssxref|SVGElement|Glossary|HTTPHeader|domxref)\(\s*([^}]+?)\s*\)\s*}}/gi,
    (match, functionName, insides) => {
      const params = insides
        .split(',')
        .map((param) => param.trim().replace(/^["']|["']$/g, ''));
      const firstParam = params[0] || '';
      const secondParam = params[1] || '';

      let url = '';
      switch (functionName.toLowerCase()) {
        case 'svgattr':
          url = `/docs/Web/SVG/Attribute/`;
          break;
        case 'htmlelement':
          url = `/docs/Web/HTML/Element/`;
          break;
        case 'cssxref':
          url = `/docs/Web/CSS/`;
          break;
        case 'svgelement':
          url = `/docs/Web/SVG/Element/`;
          break;
        case 'glossary':
          url = `/docs/Glossary/`;
          break;
        case 'httpheader':
          url = `/docs/Web/HTTP/Headers/`;
          break;
        case 'domxref':
          url = `/docs/Web/API/`;
          break;
        default:
          url = '/docs/';
          break;
      }

      // Format the URL by removing spaces, parentheses, etc.
      let formattedParam = firstParam
        .replace(/\s/g, '_') // Replace spaces with underscores
        .replace(/\(\)/g, '') // Remove parentheses from functions
        .replace(/(\w+)\./g, '$1/'); // Convert 'Window.open' to 'Window/open'

      // Add "--" for link checking could someday have something that test all links for us
      return `[${secondParam || firstParam}--](${url}${formattedParam})`;
    }
  );
}

async function getFirstParagraphs() {
  let obj = Object.fromEntries(
    Object.entries(contentFull).map(([key, value]) => {
      // Try to match the BCD data
      let k = key
        .replace('_doublecolon_', '')
        .replace('_colon_', '')
        .replace('svg/attribute', 'svg/global_attributes')
        .replace('manifest', 'html/manifest')
        .replace('html/element', 'html/elements')
        .replace('new_window', 'newwindow');

      let parsedContent = value
        .replace(/##.*/s, '')
        .trim()
        .replace(/---.*---/s, '')
        .trim()
        .replace(/^{{.*}}$/gm, '')
        .trim()
        .replace(/> \*\*Note:\*\*.*$/gm, '')
        .trim()
        .replace(/<table.*<\/table>/s, '')
        .trim()
        .replace(/\n\n.*/s, '') // allow for just one paragraph each
        .trim();
      return [k, replaceTemplateTags(parsedContent)];
    })
  );

  fs.writeFile(outputFile, JSON.stringify(obj, null, 2));
}

getFirstParagraphs();
