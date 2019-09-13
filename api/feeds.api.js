// https://mars.jpl.nasa.gov/msl-raw-images/locations.xml -- rover locations
// https://www.spacex.com/press.xml
// https://www.spacex.com/news.xml
// https://www.nasa.gov/content/nasa-rss-feeds -- list of nasa rss
// https://www.livescience.com/feeds/all"  NOTE: cant filter by space topic
// http://astronomy.com/rss/news
// https://spaceflightnow.com/feed
// https://earthsky.org/feed
import ky from "ky/umd";

function makeParser() {
    const parserUrl = process.env.RSS_PARSER_ENDPOINT;
    const parser = ky.create({ prefixUrl: parserUrl });
    return (url, isLatest) =>
        parser.get(`?url=${url}&isLatest=${isLatest}`).json();
}

const parser = makeParser();

export function PhysOrgFeed() {
    const getSpaceExplorationNews = (isLatest = false) => {
        const url = "https://phys.org/rss-feed/space-news/space-exploration";
        return parser(url, isLatest);
    };

    const getAstronomyNews = (isLatest = false) => {
        const url = "https://phys.org/rss-feed/space-news/astronomy/";
        return parser(url, isLatest);
    };

    const getAstrobiologyNews = (isLatest = false) => {
        const url = "https://phys.org/rss-feed/space-news/astrobiology/";
        return parser(url, isLatest);
    };

    return Object.freeze({
        getSpaceExplorationNews,
        getAstronomyNews,
        getAstrobiologyNews
    });
}

export function MarsFeed() {
    const getNews = (isLatest = false) => {
        const url =
            "https://mars.nasa.gov/rss/api/?feed=news&category=all&feedtype=rss";
        return parser(url, isLatest);
    };

    const getCuriosityMissionUpdate = (isLatest = false) => {
        const url = "https://mars.nasa.gov/rss/missionupdates.cfm?s=msl";
        return parser(url, isLatest);
    };

    const getScienceDailyMarsNews = (isLatest = false) => {
        const url = "https://www.sciencedaily.com/rss/space_time/mars.xml";
        return parser(url, isLatest);
    };

    return Object.freeze({
        getNews,
        getCuriosityMissionUpdate,
        getScienceDailyMarsNews
    });
}

export function NasaFeed() {
    const getBreakingNews = (isLatest = false) => {
        const url = "https://www.nasa.gov/rss/dyn/breaking_news.rss";
        return parser(url, isLatest);
    };

    const getSolarSystemNews = (isLatest = false) => {
        const url = "https://www.nasa.gov/rss/dyn/solar_system.rss";
        return parser(url, isLatest);
    };

    const getJPLNews = (isLatest = false) => {
        const url = "https://www.jpl.nasa.gov/multimedia/rss/news.xml";
        return parser(url, isLatest);
    };

    return Object.freeze({
        getBreakingNews,
        getSolarSystemNews,
        getJPLNews
    });
}

export function SpaceComFeed() {
    function get(isLatest = false) {
        const url = "https://www.space.com/home/feed/site.xml";
        return parser(url, isLatest);
    }
    return Object.freeze({
        get
    });
}
