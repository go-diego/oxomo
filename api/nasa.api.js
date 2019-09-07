import "isomorphic-unfetch";
import ky from "ky/umd";
import format from "date-fns/format";

class Nasa {
    constructor() {
        this.NASA_API_KEY = process.env.NASA_API_KEY;
        this.TODAY = format(new Date(), "YYYY-MM-DD");
    }
}

export class APOD extends Nasa {
    constructor() {
        super();
        // this.api = ky.create({
        //     prefixUrl: "https://api.nasa.gov/planetary/apod",
        //     searchParams: { api_key: this.NASA_API_KEY, hd: "true" }
        // });
    }

    /**
     * @param {string} date - defaults to today (YYYY-MM-DD)
     */
    get(date = this.TODAY) {
        return ky
            .get("https://api.nasa.gov/planetary/apod", {
                searchParams: { api_key: this.NASA_API_KEY, hd: "true", date }
            })
            .json();
    }
}

export class NEO extends Nasa {
    constructor() {
        super();
        this.BASE_URL = "https://api.nasa.gov/neo/rest/v1";
    }

    /**
     * @param {string} startDate - defaults to today (YYYY-MM-DD)
     * @param {string} endDate - defaults to today (YYYY-MM-DD)
     */
    async getFeed(startDate = this.TODAY, endDate = this.TODAY) {
        const res = await fetch(
            `${this.BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${this.NASA_API_KEY}`
        );
        return await res.json();
    }

    async getClosestApproachToday() {
        const feedForToday = await this.getFeed();
        const allApproachesToday = Object.values(
            feedForToday.near_earth_objects
        )[0].filter(neo => neo.close_approach_data.length > 0);

        return allApproachesToday.sort(
            (a, b) =>
                a.close_approach_data[0].miss_distance.lunar <
                b.close_approach_data[0].miss_distance.lunar
        )[0];
    }

    /**
     * @returns
     * - near_earth_object_count
     * - close_approach_count
     * - last_updated
     * - source
     * - nasa_jpl_url
     */
    async getStatistics() {
        const res = await fetch(
            `${this.BASE_URL}/stats?api_key=${this.NASA_API_KEY}`
        );
        return await res.json();
    }

    /**
     * TODO:
     * break this method up into seperate methods to:
     * - get total NEOS count
     * - get NEO that has come the closest
     * - etc
     */
    async getAll() {
        const res = await fetch(
            `${this.BASE_URL}/neo/browse?api_key=${this.NASA_API_KEY}`
        );
        return await res.json();
    }

    /**
     * TODO: get how many times the object has passed and what was it's closest pass
     *
     * @param {int} asteroidId
     * - Asteroid SPK-ID correlates to the NASA JPL small body
     * - id or neo_reference_id from neo feed
     */
    async get(asteroidId) {
        const res = await fetch(
            `${this.BASE_URL}/neo/${asteroidId}&api_key=${this.NASA_API_KEY}`
        );
        return await res.json();
    }

    /**
     * @param {number} asteroidId
     * - can be NearEarth object ID, SPK_ID, Asteroid designation, or SentryID
     */
    async getSentry(asteroidId) {
        const res = await fetch(
            `${this.BASE_URL}/sentry/${asteroidId}?api_key=${this.NASA_API_KEY}`
        );
        return await res.json();
    }
}

export class SpaceWeather extends Nasa {
    constructor() {
        super();
        this.get = ky.create({
            prefixUrl: "https://api.nasa.gov/DONKI",
            searchParams: { api_key: this.NASA_API_KEY }
        });
    }

    getCoronalMassEjection(startDate = this.TODAY, endDate = this.TODAY) {
        return this.get("CME", { searchParams: { startDate, endDate } });
    }

    getGeomagneticStorm(startDate = this.TODAY, endDate = this.TODAY) {
        return this.get("GMS", { searchParams: { startDate, endDate } });
    }

    getSolarFlare(startDate = this.TODAY, endDate = this.TODAY) {
        return this.get("FLR", { searchParams: { startDate, endDate } });
    }
}

export class Rovers extends Nasa {
    constructor() {
        super();
        this.get = ky.create({
            prefixUrl: "https://api.nasa.gov/mars-photos/api/v1",
            searchParams: { api_key: this.NASA_API_KEY }
        });
    }

    getAll() {
        return this.get("rovers").json();
    }

    getManifest(rover) {
        return this.get(`manifests/${rover}`).json();
    }

    getLatestPhotos(rover) {
        return this.get(`rovers/${rover}/latest_photos`).json();
    }

    getPhotos(rover, sol, camera = null) {
        return this.get(`rovers/${rover}/photos`, {
            searchParams: { sol, camera }
        }).json();
    }
}
