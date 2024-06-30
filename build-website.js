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

// After building all the HTML files, put them in a folder called "html",
// copy the whole assets folder to the out/assets directory

const copydir = require("copy-dir");
const rimraf = require("rimraf");

// Remove the existing html folder
rimraf.sync("./html");

// Create a new html folder
fs.mkdirSync("./html");

// Copy all HTML files to the html folder
fs.readdirSync(".").forEach((file) => {
  if (file.endsWith(".html")) {
    fs.copyFileSync(file, `./html/${file}`);
    }
}
);

// Copy the assets folder to out/assets
copydir.sync("./assets", "./html/assets");

console.log("✅ HTML files and assets copied successfully!");

