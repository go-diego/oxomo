const ENV_PATH = process.env.NODE_ENV === "production" ? "./.env.production" : "./.env.development";

require("dotenv").config({path: ENV_PATH});

module.exports = {
    "process.env.NASA_API_KEY": process.env.NASA_API_KEY,
    "process.env.RSS_PARSER_ENDPOINT": process.env.RSS_PARSER_ENDPOINT
};
