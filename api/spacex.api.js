import "isomorphic-unfetch";

export default class SpaceX {
    constructor() {
        this.LAUNCHES_URL = "https://api.spacexdata.com/v3/launches";
    }

    async getNextLaunch() {
        const res = await fetch(`${this.LAUNCHES_URL}/next`);
        return await res.json();
    }

    async getAllLaunches() {
        const res = await fetch(`${this.LAUNCHES_URL}`);
        return await res.json();
    }

    async getPastLaunches() {
        const res = await fetch(`${this.LAUNCHES_URL}/past`);
        return await res.json();
    }
}
