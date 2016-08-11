"use strict";


const data = { locale: process.env.npm_config_locale || "en-US" };


if (-1 < data.locale.indexOf("-")) {
    const [language, region] = data.locale.split("-");
    data.language = language;
    data.region = region;
} else {
    data.language = data.locale;
}


module.exports = data;
