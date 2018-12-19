import compareAsc from "date-fns/compare_asc";
import format from "date-fns/format";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
import ApodTile from "../components/ApodTile";
import NeoTile from "../components/NeoTile";
import SpacexTile from "../components/SpacexTile";
import SpaceXLatestLaunchTile from "../components/SpaceXLatestLaunchTile";
import MarsTile from "../components/MarsTile";
import RoverTile from "../components/RoverTile";
import RoadsterTile from "../components/RoadsterTile/RoadsterTile";
import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";

import {NEO, APOD, Rovers} from "../api/nasa.api";
import SpaceX from "../api/spacex.api";
import MAAS from "../api/maas.api";

const NEOApi = new NEO();
const APODApi = new APOD();
const RoversApi = new Rovers();
const SpaceXApi = new SpaceX();
const MAASApi = new MAAS();

const Home = ({apod, neos, spacexData, marsData}) => (
    <MainLayout>
        <HomeHero />
        <section className="section">
            <div className="container">
                <h1 className="title">{format(new Date(), "ddd, MMM Do")}</h1>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile is-parent">
                            <article className="tile is-child">
                                <ApodTile {...apod} />
                            </article>
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child p-2 notification is-warning">
                            <NeoTile {...neos} />
                        </article>
                        <article className="tile is-child notification is-danger">
                            <p className="title">News</p>
                            <p className="subtitle">Data</p>
                        </article>
                    </div>
                </div>
                <h2 className="title">Mars</h2>
                <div className="tile is-ancestor">
                    {/* <div className="tile is-12">
                        <div className="tile is-parent">
                            <article className="tile is-child notification has-background-grey-dark has-text-light">
                                <MarsTile {...marsData} />
                            </article>
                        </div>
                    </div> */}
                </div>
                <div className="tile is-ancestor">
                    <div className="tile is-12">
                        {marsData.rovers.map((rover, i) => {
                            return (
                                <div key={i} className="tile is-parent">
                                    <article className="tile is-child">
                                        <RoverTile {...rover} />
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <h2 className="title">SpaceX</h2>
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-vertical is-4">
                        <article className="tile is-child p-2 notification has-background-dark">
                            <RoadsterTile {...spacexData.roadster} />
                        </article>
                        <article className="tile is-child notification is-danger">
                            <SpacexTile {...spacexData} />
                        </article>
                    </div>
                    <div className="tile is-vertical">
                        <div className="tile is-parent">
                            <article className="tile is-child notification is-info">
                                <SpaceXLatestLaunchTile {...spacexData.launches.latest} />
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
);

Home.getInitialProps = async () => {
    let marsData = {};
    marsData.sol = await MAASApi.getRecentSolData();
    const marsRovers = await RoversApi.getAll();
    marsData.rovers = marsRovers.rovers;
    //console.log("marsData", marsData);

    const apod = await APODApi.get();
    //console.log("apod", apod);

    let neos = {};
    neos.today = await NEOApi.getFeed();
    neos.stats = await NEOApi.getStatistics();
    neos.closestApproachToday = await NEOApi.getClosestApproachToday();
    //console.log("neos", neos);

    let spacexData = {};
    spacexData.launches = {};
    const spacexLaunches = await SpaceXApi.getPastLaunches();
    spacexData.launches.count = spacexLaunches.length;
    spacexData.launches.success_count = spacexLaunches.filter(
        launch => launch.launch_success
    ).length;
    spacexData.launches.failure_count = spacexLaunches.filter(
        launch => !launch.launch_success
    ).length;
    const spacexUpcomingLaunches = await SpaceXApi.getUpcomingLaunches();
    spacexData.launches.next = spacexUpcomingLaunches.filter(
        launch => compareAsc(new Date(launch.launch_date_local), new Date()) > 0
    )[0];
    spacexData.launches.next.site = await SpaceXApi.getLaunchPadById(
        spacexData.launches.next.launch_site.site_id
    );
    spacexData.roadster = await SpaceXApi.getRoadsterData();
    spacexData.launches.latest = await SpaceXApi.getLatestLaunch();

    //console.log("spacexData", spacexData);

    // let spaceWeather = {};
    // spaceWeather.cme = await nasa.getCoronalMassEjection();
    // spaceWeather.gms = await nasa.getGeomagneticStorm();
    // spaceWeather.flr = await nasa.getSolarFlare();
    // console.log("spaceWeather", spaceWeather);

    return {
        apod,
        neos,
        spacexData,
        marsData
    };
};

export default Home;

{
    /* 
<article className="tile is-child notification has-background-grey-dark has-text-light">
        <MarsTile {...marsData} />
</article>  */
}
