import format from "date-fns/format";
import compareAsc from "date-fns/compare_asc";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
import ApodTile from "../components/ApodTile";
import NeoTile from "../components/NeoTile";
import SpacexTile from "../components/SpacexTile";
import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";

import {NEO, APOD} from "../api/nasa.api";
import SpaceXApi from "../api/spacex.api";

const NEOApi = new NEO();
const APODApi = new APOD();
const SpacexApi = new SpaceXApi();

const Home = ({apod, neos, spacexData}) => (
    <MainLayout>
        <HomeHero />
        <section className="section container">
            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile is-parent">
                        <div className="tile is-child">
                            <ApodTile {...apod} />
                        </div>
                    </div>
                    <div className="tile">
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-warning">
                                <div className="content">
                                    <NeoTile {...neos} />
                                </div>
                            </article>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-danger">
                                <div className="content">
                                    <SpacexTile {...spacexData} />
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                <div className="tile is-parent">
                    <article className="tile is-child notification has-background-grey-dark has-text-light">
                        <div className="content">
                            <p className="title">Space Weather</p>
                            <p className="subtitle">With even more content</p>
                            <div className="content" />
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </MainLayout>
);

Home.getInitialProps = async () => {
    const apod = await APODApi.get();
    console.log("apod", apod);

    let neos = {};
    neos.today = await NEOApi.getFeed();
    neos.stats = await NEOApi.getStatistics();
    /**
     * TODO: use this to get closest NEO
     */
    // const neosWithNearApproaches = Object.values(neosForToday.near_earth_objects)[0].filter(
    //     neo => neo.close_approach_data.length > 0
    // );
    // console.log("neos", neos);

    let spacexData = {};
    spacexData.launches = {};
    const spacexLaunches = await SpacexApi.getPastLaunches();
    spacexData.launches.count = spacexLaunches.length;
    spacexData.launches.success_count = spacexLaunches.filter(
        launch => launch.launch_success
    ).length;
    spacexData.launches.failure_count = spacexLaunches.filter(
        launch => !launch.launch_success
    ).length;
    const spacexUpcomingLaunches = await SpacexApi.getUpcomingLaunches();
    spacexData.launches.next = spacexUpcomingLaunches.filter(
        launch => compareAsc(new Date(launch.launch_date_local), new Date()) > 0
    )[0];
    spacexData.launches.next.site = await SpacexApi.getLaunchPadById(
        spacexData.launches.next.launch_site.site_id
    );

    // let spaceWeather = {};
    // spaceWeather.cme = await nasa.getCoronalMassEjection();
    // spaceWeather.gms = await nasa.getGeomagneticStorm();
    // spaceWeather.flr = await nasa.getSolarFlare();
    // console.log("spaceWeather", spaceWeather);

    return {
        apod,
        neos,
        spacexData
    };
};

export default Home;
