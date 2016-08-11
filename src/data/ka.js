"use strict";


const locale = process.env.npm_config_locale || "en-US";
const [language, region] = locale.split("-");


module.exports = {
    language,
    locale,
    region
};
