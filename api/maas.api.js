// https://mars.nasa.gov/rss/api/?feed=weather&category=insight&feedtype=json&ver=1.0
export default class MAAS {
    constructor() {
        this.URL =
            "http://cab.inta-csic.es/rems/wp-content/plugins/marsweather-widget/api.php";
    }

    async getData() {
        const res = await fetch(this.URL);
        return await res.json();
    }

    async getRecentSolData() {
        const res = await this.getData();
        const soles = res.soles;
        return soles[0];
    }
}
