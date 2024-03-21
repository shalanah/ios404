const axios = require('axios');
const fs = require('fs');

const url =
  'https://raw.githubusercontent.com/Fyrd/caniuse/master/fulldata-json/data-2.0.json';
const outputFile = 'src/utils/canIUseData.json'; // Output JSON file

async function fetchData() {
  try {
    const response = await axios.get(url);
    const data = response.data;
    // Write data to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${outputFile}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
