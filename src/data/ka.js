"use strict";


const fs = require("fs");
const path = require("path");


// Locale information provided via command line or the default.
const localesArg = process.env.npm_config_locale || "en-US";
const data = { locales: localesArg.split(",") };

data.locales.forEach((locale, i) => {
    data.languages = data.languages || [];

    if (-1 < locale.indexOf("-")) {
        const [language, region] = locale.split("-");
        data.languages[i] = language;

        data.regions = data.regions || [];
        data.regions[i] = region;
    } else {
        data.languages[i] = locale;
    }
});


// Debug setting that will remove all localized text. Helpful for finding text embedded in HTML or images.
data.debug = data.debug || {};
if (process.env.hasOwnProperty("npm_config_nolocale")) {
    data.debug.nolocale = true;
}


// This is the one true location for generating file names that include a
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
        return `${name}_${data.locales[0]}${ext}`;
    }

    // Other times an object that's either an fs pathObject or a gulp-rename
    // file information object (not quite the same thing).
    if (fileName.hasOwnProperty("basename")) { // gulp-rename
        fileName.basename += `_${data.locales[0]}`;
    } else if (fileName.hasOwnProperty("base")) { // fs pathObject
        fileName.base += `_${data.locales[0]}`;
    }

    return fileName;
}
