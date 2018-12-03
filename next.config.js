const {PHASE_PRODUCTION_SERVER} =
    process.env.NODE_ENV === "development"
        ? require("next/constants")
        : require("next-server/constants");

module.exports = (phase, {defaultConfig}) => {
    if (phase === PHASE_PRODUCTION_SERVER) {
        return {
            /* production only config */
        };
    }

    const withPlugins = require("next-compose-plugins");
    const withImages = require("next-images");
    const withSass = require("@zeit/next-sass");
    //   const withFonts = require("next-fonts");
    //   const withPurgeCss = require("next-purgecss");
    //   const withCSS = require("@zeit/next-css");
    //   const path = require("path");
    //   const glob = require("glob-all");
    //   const PATHS = {
    //     pages: path.join(__dirname, "pages"),
    //     components: path.join(__dirname, "components"),
    //     static: path.join(__dirname, "static")
    //   };

    //   const purgeCssConf = {
    //     purgeCss: {
    //       paths: [
    //         ...glob.sync(`${PATHS.pages}/**/*.{js,jsx,mjs}`),
    //         ...glob.sync(`${PATHS.components}/**/*.{js,jsx,mjs}`),
    //         ...glob.sync(`${PATHS.static}/js/**/*.{js,jsx,mjs}`, { nodir: true })
    //       ]
    //     }
    //   };

    return withPlugins([[withSass], [withImages]])(phase, defaultConfig);
};
