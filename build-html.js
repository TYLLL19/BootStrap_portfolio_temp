const fs = require('fs');
const path = require('path');
const { build_header } = require('./HEADER/header.js');

// Node.js script to build HTML file using data and template

// Check if all required arguments are provided
const args = process.argv.slice(2);
if (args.length < 4) {
    console.log('Usage: node build-html.js data.json template.html footer.html output.html');
    process.exit(1);
}

// Read the source data JSON file
const jsonDataPath = path.join('JSON', args[0]);
const data = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

// Read the template HTML file
const templatePath = path.join('TEMPLATE', args[1]);
const template = fs.readFileSync(templatePath, 'utf8');

// Read the footer HTML file
const footerPath = path.join(__dirname, args[2]); // Assuming footer.html is in the same folder as the script
const footer = fs.readFileSync(footerPath, 'utf8');

// Build the header using the file name of the JSON file
const header = build_header(`${path.basename(args[0])}`);

// Replace {{header}} in the template with the header
let result = template.replace('{{header}}', header);

// Replace {{footer}} in the template with the footer
result = result.replace('{{footer}}', footer);



result = lookupKeyAndReplaceWithValue(data, result, '');

// Write to the output HTML file
try {
    fs.writeFileSync(args[3], result);
    console.log('HTML file built successfully!');
} catch (error) {
    console.error('Failed to build HTML file:', error);
}

