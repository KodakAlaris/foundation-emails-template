"use strict";


let commandLineLanguage;


/**
 * This is a handlebars conditional helper that returns true if the language
 * parameter matches the first runtime language. The language is determined when the
 * application starts by examining the first locale passed in via the --locale
 * parameter; for example "npm build --locale=fr-CA". iflanguage can be used to
 * provide different pages, partials, or HTML based on the language. To use in an
 * HTML page or partial include the nugget {{#iflanguage <language>}} and a language
 * code; for example {{#iflanguage "fr"}}. Since this is a conditional it can be
 * used with built-in handlebars conditionals such as {{else}}.
 * @module
 * @parameter {string} language The language that will be tested to see if it matches the runtime language. The case of the string is ignored.
 * @param {object} options A handlebars options object.
 * @returns {boolean} True if the language matches the language of the first locale passed in via command line.
 */
module.exports = (language, options) => {
    // To set the locale use the command "npm run build --locale=en-US",
    // obviously replacing "en-US" with the locale desired.

    // The current locale to build with is passed in
    // set by src/data/ka.js
    if (options.data.root.ka.languages && options.data.root.ka.languages[0]) {
        if (!commandLineLanguage) {
            commandLineLanguage = options.data.root.ka.languages[0].toLowerCase();
        }

        if (language.toLowerCase() === commandLineLanguage) {
            return options.fn(options.data.root); // Can't use "this" here as shown in handlebars examples because it will be transpiled to undefined.
        }
    }

    return options.inverse(options.data.root); // Can't use "this" here as shown in handlebars examples because it will be transpiled to undefined.
};
