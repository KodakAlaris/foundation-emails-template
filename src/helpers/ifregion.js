"use strict";


let commandLineRegion;


module.exports = (region, options) => {
    // To set the locale use the command "npm run build --locale=en-US",
    // obviously replacing "en-US" with the locale desired.

    // The current locale to build with is passed in
    // set by src/data/ka.js
    if (!commandLineRegion) {
        commandLineRegion = options.data.root.ka.region.toLowerCase();
    }

    if (region.toLowerCase() === commandLineRegion) {
        return options.fn(this);
    }

    return options.inverse(this);
};
