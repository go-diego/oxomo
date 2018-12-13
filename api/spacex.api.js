import "isomorphic-unfetch";

export default class SpaceX {
    constructor() {
        this.LAUNCHES_URL = "https://api.spacexdata.com/v3/launches";
        this.LAUNCH_PADS_URL = "https://api.spacexdata.com/v3/launchpads";
        this.ROADSTER_URL = "https://api.spacexdata.com/v3/roadster";
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

    async getUpcomingLaunches() {
        const res = await fetch(`${this.LAUNCHES_URL}/upcoming`);
        return await res.json();
    }

    async getLaunchPadById(launchSiteId) {
        const res = await fetch(`${this.LAUNCH_PADS_URL}/${launchSiteId}`);
        return await res.json();
    }

    async getRoadsterData() {
        const res = await fetch(`${this.ROADSTER_URL}`);
        return await res.json();
    }
}
