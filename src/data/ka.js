"use strict";


const fs = require("fs");
const path = require("path");


// Locale information provided via command line or the default.
const data = { locale: process.env.npm_config_locale || "en-US" };

if (-1 < data.locale.indexOf("-")) {
    const [language, region] = data.locale.split("-");
    data.language = language;
    data.region = region;
} else {
    data.language = data.locale;
}


// This is the one tru elocation for generating file names that include a
// locale.
data.createLocalePageName = createLocalePageName;


// Get all the file names that will be created. Used by index.html to generate
// links to all of the pages.
data.pages = fs.readdirSync("src/pages")
    .filter(item => {
        const {name} = path.parse(item);
        return name !== "index";
    })
    .map(item => {
        return createLocalePageName(item);
    });


module.exports = data;


function createLocalePageName(fileName) {
    // Sometimes we'll just get a string that's a path.
    if (typeof fileName === "string") {
        const {ext, name} = path.parse(fileName);
        return `${name}_${data.locale}${ext}`;
    }

    // Other times an object that's either an fs pathObject or a gulp-rename
    // file information object (not quite the same thing).
    if (fileName.hasOwnProperty("basename")) { // gulp-rename
        fileName.basename += `_${data.locale}`;
    } else if (fileName.hasOwnProperty("base")) { // fs pathObject
        fileName.base += `_${data.locale}`;
    }

    return fileName;
}
