const fs = require('fs');
const path = require('path');
const { build_header } = require('./HEADER/header.js');

// Node.js script to build HTML file using data and template

// Check if all required arguments are provided
const args = process.argv.slice(2);
if (args.length < 3) {
    console.log('Usage: node build-html.js data.json template.html output.html');
    process.exit(1);
}

// Read the source data JSON file
const jsonDataPath = path.join('JSON', args[0]);
const data = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

// Read the template HTML file
const templatePath = path.join('TEMPLATE', args[1]);
const template = fs.readFileSync(templatePath, 'utf8');

// Build the header using the file name of the JSON file
const header = build_header(`${path.basename(args[0])}`);

// Replace {{header}} in the template with the header
let result = template.replace('{{header}}', header);

// Replace {{value}} according to {{key}} with values from the source data
const lookupKeyAndReplaceWithValue = (data, template, prefix) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
        if (typeof data[key] === 'object') {
            if (Array.isArray(data[key])) {
                data[key].forEach((element, index) => {
                    template = lookupKeyAndReplaceWithValue(element, template, `${prefix}${key}.${index}.`);
                });
            } else {
                template = lookupKeyAndReplaceWithValue(data[key], template, prefix + key + '.');
            }
        } else {
            template = template.replace(new RegExp(`{{${prefix + key}}}`, 'g'), data[key]);
        }
    });
    return template;
};

result = lookupKeyAndReplaceWithValue(data, result, '');

// Write to the output HTML file
fs.writeFileSync(args[2], result);
console.log(header)
console.log('HTML file built successfully!');
