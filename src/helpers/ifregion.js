"use strict";


let commandLineRegion;


/**
 * This is a handlebars conditional helper that returns true if the region
 * parameter matches the first runtime region. The region is determined when the
 * application starts by examining the first locale passed in via the --locale
 * parameter; for example "npm build --locale=en-US". ifregion can be used to
 * provide different pages, partials, or HTML based on the region. To use in an
 * HTML page or partial include the nugget {{#ifregion <region>}} and a region
 * code; for example {{#ifregion "us"}}. Since this is a conditional it can be
 * used with built-in handlebars conditionals such as {{else}}.
 * @module
 * @parameter {string} region The region that will be tested to see if it matches the runtime region. The case of the string is ignored.
 * @param {object} options A handlebars options object.
 * @returns {boolean} True if the region matches the region of the first locale passed in via command line.
 */
module.exports = (region, options) => {
    // To set the locale use the command "npm run build --locale=en-US",
    // obviously replacing "en-US" with the locale desired.

    // The current locale to build with is passed in
    // set by src/data/ka.js
    if (options.data.root.ka.region && options.data.root.ka.region[0]) {
        if (!commandLineRegion) {
            commandLineRegion = options.data.root.ka.region[0].toLowerCase();
        }

        if (region.toLowerCase() === commandLineRegion) {
            return options.fn(this);
        }
    }

    return options.inverse(this);
};
