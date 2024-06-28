const fs = require('fs');
const path = require('path');

// Node.js script to listen to 4 arguments
// 1. Source data JSON
// 2. Header template HTML file
// 3. Template HTML file containing {{key}} to replace with JSON data
// 4. Output HTML file

// Logic:
// 1. Read the source data JSON file
// 2. Read the header template HTML file and the template HTML file
// 3. Replace the {{value}} according to {{key}} with values from the source data
// 4. Write to the output HTML

// Usage:
// node build-html.js data.json header.html template.html output.html

const args = process.argv.slice(2);

if (args.length < 5) {
    console.log('Usage: node build-html.js data.json header.html template.html footer.html output.html');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(path.join('JSON', args[0]), 'utf8'));
const headerTemplate = fs.readFileSync(path.join('HEADER', args[1]), 'utf8');
const template = fs.readFileSync(path.join('TEMPLATE', args[2]), 'utf8');

const lookupKeyAndReplaceWithValue = (data, template, prefix) => {
    const keys = Object.keys(data);
    let result = template;
    keys.forEach((key) => {
        if (typeof data[key] === 'object') {
            if (Array.isArray(data[key])) {
                data[key].forEach((element, index) => {
                    result = lookupKeyAndReplaceWithValue(element, result, `${prefix}${key}.${index}.`);
                });
            } else {
                result = lookupKeyAndReplaceWithValue(data[key], result, prefix + key + '.');
            }
        } else {
            result = result.replace(new RegExp(`{{${prefix + key}}}`, 'g'), data[key]);
        }
    });
    return result;
};

const header = lookupKeyAndReplaceWithValue(data, headerTemplate, '');
let result = lookupKeyAndReplaceWithValue(data, template, '');

result = result.replace('{{header}}', header);

fs.writeFileSync(args[4], result);
console.log('HTML file built successfully!');
