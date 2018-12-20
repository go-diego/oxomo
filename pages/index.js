import compareAsc from "date-fns/compare_asc";
import format from "date-fns/format";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
import ApodTile from "../components/ApodTile";
import NeoTile from "../components/NeoTile";
import SpaceXNextLaunchTile from "../components/SpaceXNextLaunchTile";
import SpaceXLatestLaunchTile from "../components/SpaceXLatestLaunchTile";
import MarsTile from "../components/MarsTile";
import RoverTile from "../components/RoverTile";
import RoadsterTile from "../components/RoadsterTile";
import NasaNewsTile from "../components/NasaNewsTile";
import MarsNewsTile from "../components/MarsNewsTile";
import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";
import MarsImage from "../images/mars-landscape.jpg";

import {NEO, APOD, Rovers} from "../api/nasa.api";
import SpaceX from "../api/spacex.api";
import MAAS from "../api/maas.api";
import {NasaFeed, MarsFeed} from "../api/feed.api";

const NEOApi = new NEO();
const APODApi = new APOD();
const RoversApi = new Rovers();
const SpaceXApi = new SpaceX();
const MAASApi = new MAAS();
const NasaFeedApi = new NasaFeed();
const MarsFeedApi = new MarsFeed();

const Home = ({nasaData, spacexData, marsData}) => (
    <MainLayout>
        <HomeHero />
        <h1 className="subtitle py-3 has-text-centered">{format(new Date(), "ddd, MMM Do")}</h1>
        <section className="section">
            <div className="container">
                <h1 className="title">NASA News</h1>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile is-parent">
                            <article className="tile is-child">
                                <ApodTile {...nasaData.apod} />
                            </article>
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                        <article className="tile is-child p-2 notification is-warning">
                            <NeoTile {...nasaData.neos} />
                        </article>
                        <article className="tile is-child">
                            <NasaNewsTile {...nasaData.news} />
                        </article>
                    </div>
                </div>
            </div>
        </section>
        <section
            className="section"
            style={{
                backgroundImage: `url(${MarsImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}>
            <div className="container">
                <h2 className="title">Mars Memo</h2>
                <div className="tile is-ancestor">
                    {/* <div className="tile is-12">
                        <div className="tile is-parent">
                            <article className="tile is-child notification has-background-grey-dark has-text-light">
                                <MarsTile {...marsData} />
                            </article>
                        </div>
                    </div> */}
                    <div className="tile is-12">
                        <div className="tile is-parent">
                            <article className="tile is-child">
                                <MarsNewsTile {...marsData.news} />
                            </article>
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child" />
                        </div>
                        <div className="tile is-parent">
                            <article className="tile is-child" />
                        </div>
                    </div>
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
            </div>
        </section>
        <section className="section">
            <div className="container">
                <h2 className="title">SpaceX Scoop</h2>
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-vertical is-4">
                        <article className="tile is-child p-2 notification has-background-dark">
                            <RoadsterTile {...spacexData.roadster} />
                        </article>
                        <article className="tile is-child notification is-danger">
                            <SpaceXNextLaunchTile {...spacexData} />
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

    //{/* <a href='https://www.freepik.com/free-vector/colorful-mars-background-with-flat-design_3231758.htm'>Designed by Freepik</a> */}
);

Home.getInitialProps = async () => {
    let marsData = {};
    marsData.sol = await MAASApi.getRecentSolData();
    const marsRovers = await RoversApi.getAll();
    marsData.rovers = marsRovers.rovers;
    marsData.news = await MarsFeedApi.getNews();
    //console.log("marsData", marsData);

    let nasaData = {};
    nasaData.apod = await APODApi.get();
    //console.log("apod", apod);
    nasaData.neos = {};
    nasaData.neos.today = await NEOApi.getFeed();
    nasaData.neos.stats = await NEOApi.getStatistics();
    nasaData.neos.closestApproachToday = await NEOApi.getClosestApproachToday();
    nasaData.news = await NasaFeedApi.getSolarSystemNews();
    console.log("nasaData", nasaData);

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
        nasaData,
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
