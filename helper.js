// Replace {{value}} according to {{key}} with values from the source data
const lookupKeyAndReplaceWithValue = (data, template, prefix) => {
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (typeof data[key] === "object") {
      if (Array.isArray(data[key])) {
        data[key].forEach((element, index) => {
          template = lookupKeyAndReplaceWithValue(
            element,
            template,
            `${prefix}${key}.${index}.`
          );
        });
      } else {
        template = lookupKeyAndReplaceWithValue(
          data[key],
          template,
          prefix + key + "."
        );
      }
    } else {
      template = template.replace(
        new RegExp(`{{${prefix + key}}}`, "g"),
        data[key]
      );
    }
  });
  return template;
};

module.exports = {
  lookupKeyAndReplaceWithValue,
};
