//Nodejs script to listen 3 arguments
//1. source data json
//2. template html file contains {{key}} to replace with json data
//3. output html 

//Logic:
//1. Read source data json
//2. Read template html file
//3. replace the {{value}} according to {{key}} with value from source data, also check if it is array of
//4. write to output html

//Usage:
//node build-html.js data.json template.html output.html

const fs = require('fs');
const path = require('path');
const args = process.argv.slice(2);

if (args.length < 3) {
    console.log('Usage: node build-html.js data.json template.html output.html');
    process.exit(1);
}

const data = JSON.parse(fs.readFileSync(args[0], 'utf8'));
const template = fs.readFileSync(args[1], 'utf8');

const lookupKeyAndReplaceWithValue = (data, template, prefix) => {
    const keys = Object.keys(data);
    let result = template;
    keys.forEach(key => {
        if (typeof data[key] === 'object') {
            if (Array.isArray(data[key])) {
                data[key].forEach((element, index) => {
                    result = lookupKeyAndReplaceWithValue(element, result, `${prefix}${key}.${index}.`);
                });
            } else {
                result = lookupKeyAndReplaceWithValue(data[key], result, prefix + key + '.');
            }
        } else {
            console.log('key:', prefix + key);
                        // console.log('replace', (prefix ? prefix : '') + key);
                        result = result.replace(new RegExp(`{{${prefix + key}}}`, 'g'), data[key]);
                    };
    });
    return result;
}

let result = lookupKeyAndReplaceWithValue(data, template, '');
fs.writeFileSync(args[2], result);
console.log('HTML file built successfully!');
