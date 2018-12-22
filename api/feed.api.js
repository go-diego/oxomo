// https://mars.jpl.nasa.gov/msl-raw-images/locations.xml -- rover locations
// https://www.spacex.com/press.xml
// https://www.spacex.com/news.xml
// https://www.nasa.gov/content/nasa-rss-feeds -- list of nasa rss
import "isomorphic-unfetch";

class Feed {
    constructor() {
        const Parser = require("rss-parser");
        this.parser = new Parser({
            customFields: {
                item: ["media:content"]
            }
        });
        this.RSS_PARSER_URL = process.env.RSS_PARSER_ENDPOINT;
    }
}

export class NasaFeed extends Feed {
    constructor() {
        super();
        this.BREAKING_NEWS_FEED_URL = "https://www.nasa.gov/rss/dyn/breaking_news.rss";
        this.SOLAR_SYSTEM_NEWS_FEED_URL = "https://www.nasa.gov/rss/dyn/solar_system.rss";
        this.JPL_NEWS_FEED_URL = "https://www.jpl.nasa.gov/multimedia/rss/news.xml";
    }

    async getBreakingNews() {
        let feed = await this.parser.parseURL(this.BREAKING_NEWS_FEED_URL);
        return feed;
    }

    async getSolarSystemNews() {
        const feed = await fetch(`${this.RSS_PARSER_URL}?url=${this.SOLAR_SYSTEM_NEWS_FEED_URL}`);
        return feed.json();
    }

    async getJPLNews() {
        let feed = await this.parser.parseURL(this.JPL_NEWS_FEED_URL);
        return feed;
    }
}

export class MarsFeed extends Feed {
    constructor() {
        super();
        this.NEWS_FEED_URL = "https://mars.nasa.gov/rss/api/?feed=news&category=all&feedtype=rss";
        this.CURIOSITY_MISSION_UPDATES_FEED_URL =
            "https://mars.nasa.gov/rss/missionupdates.cfm?s=msl";
    }

    async getNews() {
        const feed = await fetch(`${this.RSS_PARSER_URL}?url=${this.NEWS_FEED_URL}`);
        return feed.json();
    }

    async getCuriosityMissionUpdate() {
        let feed = await this.parser.parseURL(this.CURIOSITY_MISSION_UPDATES_FEED_URL);
        return feed;
    }
}
