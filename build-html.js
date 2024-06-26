//Nodejs script to listen 3 arguments
//1. source data json
//2. template html file contains {{key}} to replace with json data
//3. output html 

//Logic:
//1. Read source data json
//2. Read template html file
//3. replace the {{value}} according to {{key}} with value from source data
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

const output = template.replace(/{{\s*([^}\s]+)\s*}}/g, (match, key) => {
    return data[key] || match;
}
);

fs.writeFileSync(args[2], output);
console.log('HTML file built successfully!');