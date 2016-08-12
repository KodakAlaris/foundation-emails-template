"use strict";


let localeMain;
let strings;


/**
 * i18n is a handlebars block helper that returns a localized string. The
 * locale is determined when the application starts by passing a --locale
 * parameter; for example "npm build --locale=en-US". In this case pages with
 * US English strings will be rendered. To use in an HTML page or partial
 * include the nugget {{#i18n}} along with a key that exists in an i18n JSON
 * file; for example {{#i18n}}header-title{{/i18n}}.
 * @module
 * @param {string|number} [localeId] An optional parameter to specify a specific locale. This must match one of the locales passed in via command line.
 * @param {object} options A handlebars options object.
 */
module.exports = function () { // Babel bug will incorrectly transform "arguments" in an arrow function into "_arguments", keep pre-ES2015 syntax.
    let text;
    try {
        // The current locale to build with is passed in
        // set by src/data/ka.js
        const options = arguments[arguments.length - 1];

        // Was the --nolocale debug argument passed via commandline?
        if (options.data.root.ka.debug.nolocale) {
            return;
        }

        // The strings for a specific language will be stored globally once per
        // session.
        if (!strings) {
            strings = {};
            options.data.root.ka.locales.forEach((locale, i) => {
                if (i === 0){
                    localeMain = locale;
                }

                strings[locale] = require(`../i18n/${locale}.json`);
            });
        }

        const key = options.fn(this);

        // Was an override locale provided as the first argument?
        let locale;
        if (arguments.length < 2) {
            locale = localeMain;
        } else {
            // Is it an index into the properties of the strings object or a
            // locale string that matches a property name on the strings
            // object?
            if (typeof arguments[0] === "string") {
                locale = arguments[0];
            } else if (typeof arguments[0] === "number") {
                const keys = Object.keys(strings);
                if (arguments[0] < keys.length) {
                    locale = keys[arguments[0]];
                }
            }
        }

        if (strings && strings[locale]) {
            text = strings[locale][key] || `-&gt;${key}&lt;-`;
        } else {
            text = `|&gt;${locale}&lt;|`;
        }
    } catch (err) {
        console.log(`i18n.js - ${err.message || JSON.stringify(err)}`);
    }

    return text;
};
