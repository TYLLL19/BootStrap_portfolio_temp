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

// After building all the HTML files, put them in a folder called "html", then copy the CSS and JS files to the out directory
// copy the whole assets folder to the out/assets directory
const ncp = require("ncp").ncp;
ncp.limit = 16;
ncp("./assets", "./out/assets", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("Copied assets folder to out directory");
});
// copy all the HTML files to the out directory
ncp("./HTML", "./out", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("Copied HTML files to out directory");
});
// copy the CSS and JS files to the out directory
ncp("./CSS", "./out", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("Copied CSS files to out directory");
});
ncp("./JS", "./out", function (err) {
  if (err) {
    return console.error(err);
  }
  console.log("Copied JS files to out directory");
});
