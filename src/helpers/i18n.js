"use strict";


let strings;


/**
 * i18n is a handlebars block helper that returns a localized string. The
 * locale is determined when the application starts by passing a --locale
 * parameter; for example "npm build --locale=en-US". In this case pages with
 * US English strings will be rendered. To use in an HTML page or partial
 * include the nugget {{#i18n}} along with a key that exists in an i18n JSON
 * file; for example {{#i18n}}header-title{{/i18n}}.
 * @module
 */
module.exports = function () { // Babel bug will incorrectly transform "arguments" in an arrow function into "_arguments".
    let text;
    try {
        // The current locale to build with is passed in
        // set by src/data/ka.js
        const options = arguments[arguments.length - 1];
        let stringsFileName = options.data.root.ka.locales[0];

        // The strings for a specific language will be stored globally once per
        // session.
        if (!strings) {
            strings = require(`../i18n/${stringsFileName}.json`);
        }

        const key = options.fn(this);

        if (strings) {
            text = strings[key] || `-&gt;${key}&lt;-`;
        } else {
            text = `LOCALE MISSING - '${stringsFileName}'`;
        }
    } catch (err) {
        console.log(`i18n.js - ${err.message || JSON.stringify(err)}`);
    }

    return text;
};
