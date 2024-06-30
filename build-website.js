const buildSingleHtml = require("./build-single-html");

// This script will read all JSON files in the JSON directory and call buildSingleHtml function for each file.
// Read all files under JSON directory
const fs = require("fs");
const path = require("path");
const jsonFiles = fs.readdirSync("./JSON");
// Loop through each file
jsonFiles.forEach((file) => {
  try {
    // Get the file name without the extension
    const pageSlug = path.basename(file, ".json");
    // Call buildSingleHtml function
    buildSingleHtml(pageSlug);
    console.log(`✅ ${pageSlug}.html is created`);
  } catch (e) {
    console.log("Error while processing file: " + file);
    console.log(e);
  }
});


// After building all the HTML files, copy the CSS and JS files to the out directory
// copy the whole assets folder to the out/assets directory
const ncp = require("ncp").ncp;
ncp.limit = 16;
ncp("./assets", "./out/data/assets", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("🚀 Copy assets done!");
});
