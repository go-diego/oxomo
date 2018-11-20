/**
 *  TODO:
 * check https://github.com/sindresorhus/ky/pull/46 to use ky without having to transpile dependencies
 * EXAMPLE: return await ky.post(`${this.APOD_BASE_URL}`, {searchParams: process.env.NASA_API_KEY}).json();
 */

//import ky from "ky";
import "isomorphic-unfetch";
import format from "date-fns/format";

export default class Nasa {
    constructor() {
        this.NASA_API_KEY = process.env.NASA_API_KEY;
        this.APOD_BASE_URL = "https://api.nasa.gov/planetary/apod";
        this.NEO_BASE_URL = "https://api.nasa.gov/neo/rest/v1";
        this.DONKI_BASE_URL = "https://api.nasa.gov/DONKI";
    }

    /**
     * @param {string} date - defaults to today (YYYY-MM-DD)
     */
    async getAstronomyPictureOfTheDay(date) {
        const res = await fetch(
            `${this.APOD_BASE_URL}?hd=true&${date ? `date=${date}&` : ""}api_key=${
                this.NASA_API_KEY
            }`
        );
        return await res.json();
    }

    /**
     * @param {string} startDate - defaults to today (YYYY-MM-DD)
     * @param {string} endDate - defaults to today + 7 (YYYY-MM-DD)
     */
    async getNearEarthObjectsFeed(startDate = "", endDate = "") {
        const res = await fetch(
            `${this.NEO_BASE_URL}/feed?${startDate ? `start_date=${startDate}&` : ""}${
                endDate ? `end_date=${endDate}&` : ""
            }api_key=${this.NASA_API_KEY}`
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
    async getNearEarthObjectById(asteroidId) {
        const res = await fetch(
            `${this.NEO_BASE_URL}/neo/${asteroidId}&api_key=${this.NASA_API_KEY}`
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
    async getAllNearEarthObjects() {
        const res = await fetch(`${this.NEO_BASE_URL}/neo/browse?api_key=${this.NASA_API_KEY}`);
        return await res.json();
    }

    /**
     *
     *
     * @returns
     * - near_earth_object_count
     * - close_approach_count
     * - last_updated
     * - source
     * - nasa_jpl_url
     */
    async getNeoStatistics() {
        const res = await fetch(`${this.NEO_BASE_URL}/stats?api_key=${this.NASA_API_KEY}`);
        return await res.json();
    }

    /**
     * @param {number} asteroidId
     * - can be NearEarth object ID, SPK_ID, Asteroid designation, or SentryID
     */
    async getNeoSentryById(asteroidId) {
        const res = await fetch(
            `${this.NEO_BASE_URL}/sentry/${asteroidId}?api_key=${this.NASA_API_KEY}`
        );
        return await res.json();
    }

    async getCoronalMassEjection(
        startDate = format(new Date(), "YYYY-MM-DD"),
        endDate = format(new Date(), "YYYY-MM-DD")
    ) {
        const res = await fetch(
            `${this.DONKI_BASE_URL}/CME?startDate=${startDate}&endDate=${endDate}&api_key=${
                this.NASA_API_KEY
            }`
        );

        let response = null;
        try {
            response = await res.json();
        } catch (error) {
            console.log("ERROR");
        }

        return response;
    }

    async getGeomagneticStorm(
        startDate = format(new Date(), "YYYY-MM-DD"),
        endDate = format(new Date(), "YYYY-MM-DD")
    ) {
        const res = await fetch(
            `${this.DONKI_BASE_URL}/GMS?startDate=${startDate}&endDate=${endDate}&api_key=${
                this.NASA_API_KEY
            }`
        );

        let response = null;
        try {
            response = await res.json();
        } catch (error) {
            console.log("ERROR");
        }

        return response;
    }

    async getSolarFlare(
        startDate = format(new Date(), "YYYY-MM-DD"),
        endDate = format(new Date(), "YYYY-MM-DD")
    ) {
        const res = await fetch(
            `${this.DONKI_BASE_URL}/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${
                this.NASA_API_KEY
            }`
        );

        let response = null;
        try {
            response = await res.json();
        } catch (error) {
            console.log("ERROR");
        }

        return response;
    }
}
