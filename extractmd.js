// use this js script to extract data from the About.md in "pageCMD" folder
// Read the source markdown file

// then replace the value of the "data" variable in the about.template.html file
// with the content of the About.md file
// and save the result in the out folder as about.html
// use the build-single-html-with-md.js script as a reference
// to build the about.html file
// and run the script using the following command
// node extractmd.js

const fs = require('fs');
const path = require('path');
const { build_header } = require('./HEADER/header.js');
const { lookupKeyAndReplaceWithValue } = require('./helper.js');

// Check if all required arguments are provided
const args = process.argv.slice(2);
if (args.length < 4) {
    console.log('Usage: node build-html.js data.json template.html footer.html output.html');
    process.exit(1);
}

// Read the source markdown file
const mdFilePath = path.join('pageCMS', args[0]);
const data = fs.readFileSync(mdFilePath, 'utf8');

// Read the template HTML file
const templatePath = path.join('TEMPLATE', args[1]);
const template = fs.readFileSync(templatePath, 'utf8');

// Read the footer HTML file
const footerPath = path.join('HTML', args[2]);
const footer = fs.readFileSync(footerPath, 'utf8');



// Build the header using the file name of the md file
const header = build_header(`${path.basename(args[0])}`);

// Replace {{header}} in the template with the header
let result = template.replace('{{header}}', header);

// Replace {{footer}} in the template with the footer
result = result.replace('{{footer}}', footer);

result = lookupKeyAndReplaceWithValue(data, result, '');
console.log(result)
// Write to the output HTML file
try {
    fs.writeFileSync(args[3], result);
    console.log('HTML file built successfully!');
}
catch (error) {
    console.error('Failed to build HTML file:', error);
}

// node extractmd.js About.md about.template.html footer.html out/about.html