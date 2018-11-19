import format from "date-fns/format";
import compareAsc from "date-fns/compare_asc";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
import ApodTile from "../components/ApodTile";
import NeoTile from "../components/NeoTile";
import SpacexTile from "../components/SpacexTile";
import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";

import NasaApi from "../api/nasa.api";
import SpacexApi from "../api/spacex.api";

const nasa = new NasaApi();
const spacex = new SpacexApi();

const Home = ({apod, neos, spacexData}) => (
    <MainLayout>
        <HomeHero />
        <section className="section container">
            <div className="tile is-ancestor">
                <div className="tile is-8 is-parent">
                    <ApodTile {...apod} />
                </div>
                <div className="tile is-4 is-parent is-vertical">
                    <div className="title is-child notification is-warning">
                        <NeoTile {...neos} />
                    </div>
                    <div className="title is-child notification is-danger">
                        <SpacexTile {...spacexData} />
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
);

Home.getInitialProps = async () => {
    const startDate = format(new Date(), "YYYY-MM-DD");
    const endDate = startDate;

    const apod = await nasa.getAstronomyPictureOfTheDay();

    let neos = {};
    neos.today = await nasa.getNearEarthObjectsFeed(startDate, endDate);
    neos.stats = await nasa.getNeoStatistics();
    /**
     * TODO: use this to get closest NEO
     */
    // const neosWithNearApproaches = Object.values(neosForToday.near_earth_objects)[0].filter(
    //     neo => neo.close_approach_data.length > 0
    // );

    let spacexData = {};
    spacexData.launches = {};
    const spacexLaunches = await spacex.getPastLaunches();
    spacexData.launches.count = spacexLaunches.length;
    spacexData.launches.success_count = spacexLaunches.filter(
        launch => launch.launch_success
    ).length;
    spacexData.launches.failure_count = spacexLaunches.filter(
        launch => !launch.launch_success
    ).length;
    const spacexUpcomingLaunches = await spacex.getUpcomingLaunches();
    spacexData.launches.next = spacexUpcomingLaunches.filter(
        launch => compareAsc(new Date(launch.launch_date_local), new Date()) > 0
    )[0];
    spacexData.launches.next.site = await spacex.getLaunchPadById(
        spacexData.launches.next.launch_site.site_id
    );

    return {
        apod,
        neos,
        spacexData
    };
};

export default Home;
