const fs = require("fs");
const { marked } = require("marked");
const { lookupKeyAndReplaceWithValue } = require("./helper");
const { build_header } = require("./HEADER/header");

function buildPage(mdFile, templateFile, outputFile) {
  // 1. Read the Markdown file
  const mdPath = `./pageCMS/${mdFile}`;
  const mdContent = fs.readFileSync(mdPath, "utf8");
  console.log(mdContent);

  // 2. Parse the Markdown content
  const parsedContent = parseMarkdown(mdContent);

  // 3. Read the template HTML file
  const templatePath = `./TEMPLATE/${templateFile}`;
  const templateData = fs.readFileSync(templatePath, "utf8");

  // 4. Read header.html
  const pageSlug = outputFile.replace('.html', '');
  const header = build_header(pageSlug);

  // 5. Read footer.html
  const footer = fs.readFileSync("./HTML/footer.html", "utf8");

  // 6. Replace placeholders in the template
  let html = lookupKeyAndReplaceWithValue(parsedContent, templateData, "");
  html = html.replace("{{header}}", header);
  html = html.replace("{{footer}}", footer);

  // 7. Write the output HTML file
  if (!fs.existsSync("./out")) {
    fs.mkdirSync("./out");
  }
  fs.writeFileSync(`./out/${outputFile}`, html);
}

function parseMarkdown(mdContent) {
  const parsedContent = {};
  
  // Split the Markdown content into sections
  const sections = mdContent.split(/^##\s+/m).filter(Boolean);

  sections.forEach(section => {
    const lines = section.split('\n').filter(Boolean);
    const title = lines[0].trim();
    const content = marked(lines.slice(1).join('\n'));
    parsedContent[title.toLowerCase()] = content;
  });

  return parsedContent;
}

// Check if the correct number of arguments is provided
if (process.argv.length !== 5) {
  console.log("Usage: node build-with-md.js <md-file> <template-file> <output-file>");
  process.exit(1);
}

// Get command line arguments
const [, , mdFile, templateFile, outputFile] = process.argv;

// Run the build process
buildPage(mdFile, templateFile, outputFile);