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
