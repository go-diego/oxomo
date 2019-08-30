// https://mars.jpl.nasa.gov/msl-raw-images/locations.xml -- rover locations
// https://www.spacex.com/press.xml
// https://www.spacex.com/news.xml
// https://www.nasa.gov/content/nasa-rss-feeds -- list of nasa rss
// https://www.space.com/home/feed/site.xml - for mars, filter source.title by "mars" ?
// https://www.sciencedaily.com/rss/space_time/mars.xml
// https://phys.org/feeds/
// https://www.livescience.com/feeds/all"  NOTE: cant filter by space topic
import "isomorphic-unfetch";
import ky from "ky/umd";

class Feed {
    constructor() {
        // const Parser = require("rss-parser");
        // this.parser = new Parser({
        //     customFields: {
        //         item: ["media:content"]
        //     }
        // });
        this.RSS_PARSER_URL = process.env.RSS_PARSER_ENDPOINT;
    }
}

export class NasaFeed extends Feed {
    constructor() {
        super();
        this.BREAKING_NEWS_FEED_URL =
            "https://www.nasa.gov/rss/dyn/breaking_news.rss";
        this.SOLAR_SYSTEM_NEWS_FEED_URL =
            "https://www.nasa.gov/rss/dyn/solar_system.rss";
        this.JPL_NEWS_FEED_URL =
            "https://www.jpl.nasa.gov/multimedia/rss/news.xml";
    }

    async getBreakingNews() {
        const feed = await fetch(
            `${this.RSS_PARSER_URL}?url=${this.BREAKING_NEWS_FEED_URL}`
        );
        return feed.json();
    }

    async getSolarSystemNews() {
        const feed = await fetch(
            `${this.RSS_PARSER_URL}?url=${this.SOLAR_SYSTEM_NEWS_FEED_URL}`
        );
        return feed.json();
    }

    async getJPLNews() {
        const feed = await fetch(
            `${this.RSS_PARSER_URL}?url=${this.JPL_NEWS_FEED_URL}`
        );
        return feed.json();
    }
}

export class MarsFeed extends Feed {
    constructor() {
        super();
        this.NEWS_FEED_URL =
            "https://mars.nasa.gov/rss/api/?feed=news&category=all&feedtype=rss";
        this.CURIOSITY_MISSION_UPDATES_FEED_URL =
            "https://mars.nasa.gov/rss/missionupdates.cfm?s=msl";
        this.SCIENCE_DAILY_MARS_NEWS =
            "https://www.sciencedaily.com/rss/space_time/mars.xml";
    }

    async getNews() {
        const feed = await fetch(
            `${this.RSS_PARSER_URL}?url=${this.NEWS_FEED_URL}`
        );
        return feed.json();
    }

    async getCuriosityMissionUpdate() {
        const feed = await fetch(
            `${this.RSS_PARSER_URL}?url=${this.CURIOSITY_MISSION_UPDATES_FEED_URL}`
        );
        return feed.json();
    }

    async getScienceDailyMarsNews() {
        const feed = await fetch(
            `${this.RSS_PARSER_URL}?url=${this.SCIENCE_DAILY_MARS_NEWS}`
        );
        return feed.json();
    }
}

export function LiveScienceFeed() {
    const feedUrl = "https://www.livescience.com/feeds/all";

    function getAll() {
        return ky(`${process.env.RSS_PARSER_ENDPOINT}?url=${feedUrl}`).json();
    }

    return Object.freeze({
        getAll
    });
}
