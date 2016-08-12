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
 */
module.exports = function () { // Babel bug will incorrectly transform "arguments" in an arrow function into "_arguments", keep pre-ES2015 syntax.
    let text;
    try {
        // The current locale to build with is passed in
        // set by src/data/ka.js
        debugger;
        const options = arguments[arguments.length - 1];

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

        if (strings && strings[localeMain]) {
            text = strings[localeMain][key] || `-&gt;${key}&lt;-`;
        } else {
            text = `-&gt;${localeMain}&lt;-`;
        }
    } catch (err) {
        console.log(`i18n.js - ${err.message || JSON.stringify(err)}`);
    }

    return text;
};
