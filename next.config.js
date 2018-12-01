const withSass = require("@zeit/next-sass");
const withImages = require("next-images");

module.exports = withImages(
    withSass({
        //cssModules: true,
        webpack: config => {
            // Fixes npm packages that depend on `fs` module
            config.node = {
                fs: "empty"
            };

            config.module.rules = config.module.rules.map(rule => {
                if (rule.loader === "babel-loader") {
                    rule.options.cacheDirectory = false;
                }
                return rule;
            });

            return config;
        }
    })
);
