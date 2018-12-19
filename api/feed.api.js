//const Parser = require("rss-parser");
//const parser = new Parser();

// export async function curiosityFeed() {
//     let feed = await parser.parseURL("");
//     console.log("FEED", feed);
//     return feed;
// }

// https://mars.jpl.nasa.gov/msl-raw-images/locations.xml -- rover locations
// "https://www.spacex.com/press.xml
// https://www.spacex.com/news.xml
export class MarsFeed {
    constructor() {
        this.JPL_NEWS_FEED_URL = "https://www.jpl.nasa.gov/multimedia/rss/news.xml";
        this.NEWS_FEED_URL = "https://mars.nasa.gov/rss/api/?feed=news&category=all&feedtype=rss";
        this.CURIOSITY_MISSION_UPDATES_FEED_URL =
            "https://mars.nasa.gov/rss/missionupdates.cfm?s=msl";
    }
}
