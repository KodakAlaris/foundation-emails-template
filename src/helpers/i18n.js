"use strict";


let strings;


module.exports = options => {
    // To set the locale use the command "npm run build --locale=en-US",
    // obviously replacing "en-US" with the locale desired.

    // The current locale to build with is passed in
    // set by src/data/ka.js
    const locale = options.data.root.ka.locale;

    // The strings for a specific language will be stored globally once per
    // session.
    if (!strings) {
        strings = require(`../i18n/${locale}.json`);
    }

    const key = options.fn(this);
    const text = strings[key];
    return `<span>${text}</span>`;
};
