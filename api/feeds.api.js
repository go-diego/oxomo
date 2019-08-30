// https://mars.jpl.nasa.gov/msl-raw-images/locations.xml -- rover locations
// https://www.spacex.com/press.xml
// https://www.spacex.com/news.xml
// https://www.nasa.gov/content/nasa-rss-feeds -- list of nasa rss
// https://www.space.com/home/feed/site.xml - for mars, filter source.title by "mars" ?
// https://www.sciencedaily.com/rss/space_time/mars.xml
// https://phys.org/feeds/
// https://www.livescience.com/feeds/all"  NOTE: cant filter by space topic
import ky from "ky/umd";

function makeParser(url, isLatest) {
    const parserUrl = process.env.RSS_PARSER_ENDPOINT;
    const parser = ky.create({ prefixUrl: parserUrl });

    return parser.get(`?url=${url}&isLatest=${isLatest}`).json();
}

export function PhysOrgFeed() {
    const getSpaceExplorationNews = (isLatest = false) => {
        const url = "https://phys.org/rss-feed/space-news/space-exploration";
        return makeParser(url, isLatest);
    };

    const getAstronomyNews = (isLatest = false) => {
        const url = "https://phys.org/rss-feed/space-news/astronomy/";
        return makeParser(url, isLatest);
    };

    const getAstrobiologyNews = (isLatest = false) => {
        const url = "https://phys.org/rss-feed/space-news/astrobiology/";
        return makeParser(url, isLatest);
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
        return makeParser(url, isLatest);
    };

    const getCuriosityMissionUpdate = (isLatest = false) => {
        const url = "https://mars.nasa.gov/rss/missionupdates.cfm?s=msl";
        return makeParser(url, isLatest);
    };

    const getScienceDailyMarsNews = (isLatest = false) => {
        const url = "https://www.sciencedaily.com/rss/space_time/mars.xml";
        return makeParser(url, isLatest);
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
        return makeParser(url, isLatest);
    };

    const getSolarSystemNews = (isLatest = false) => {
        const url = "https://www.nasa.gov/rss/dyn/solar_system.rss";
        return makeParser(url, isLatest);
    };

    const getJPLNews = (isLatest = false) => {
        const url = "https://www.jpl.nasa.gov/multimedia/rss/news.xml";
        return makeParser(url, isLatest);
    };

    return Object.freeze({
        getBreakingNews,
        getSolarSystemNews,
        getJPLNews
    });
}
