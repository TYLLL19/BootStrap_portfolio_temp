const fs = require("fs");
const { lookupKeyAndReplaceWithValue } = require("./helper");
const { build_header } = require("./HEADER/header");
module.exports = function (pageSlug) {
  // about
  // 1. Read the JSON file
  // e.g. read about.json
  const jsonData = require(`./src/${pageSlug}.json`);
  //   console.log("json", jsonData);
  //2. File Read the template HTML file
  // e.g. read template.html
  const templatePath = `./TEMPLATE/${pageSlug}.template.html`;
  const templateData = fs.readFileSync(templatePath, "utf8");
  //   console.log("template", templateData);

  // 3. read header.html
  const header = build_header(pageSlug);

  // 4. read footer.html
  const footer = fs.readFileSync("./HTML/footer.html", "utf8");
//   console.log(footer);

  let html = lookupKeyAndReplaceWithValue(jsonData, templateData, "");
  // replace {{header}} in the template with the header
  html = html.replace("{{header}}", header);
  // replace {{footer}} in the template with the footer
  html = html.replace("{{footer}}", footer);

  // check out folder exists or not
  if (!fs.existsSync("./out")) {
    fs.mkdirSync("./out");
  }

  // always write the output html under a directory called "out"
  fs.writeFileSync(`./out/${pageSlug}.html`, html);
};
