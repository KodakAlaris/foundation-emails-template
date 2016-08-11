"use strict";


let strings;


module.exports = options => {
    // To set the locale use the command "npm run build --locale=en-US",
    // obviously replacing "en-US" with the locale desired.

    // The current locale to build with is passed in
    // set by src/data/ka.js
    let fileName = options.data.root.ka.locale;

    // The strings for a specific language will be stored globally once per
    // session.
    if (!strings) {
        strings = require(`../i18n/${fileName}.json`);

        // There might not be strings for a specific locale, but rather a more
        // generic language.
        if (!strings) {
            fileName = options.data.root.ka.language;
            strings = require(`../i18n/${fileName}.json`);
        }
    }

    const key = options.fn(this);

    let text;
    if (strings) {
        text = strings[key] || `-&gt;${key}&lt;-`;
    } else {
        text = `LOCALE MISSING - '${fileName}'`;
    }

    return `<span>${text}</span>`;
};
