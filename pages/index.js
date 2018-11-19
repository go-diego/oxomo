import React from "react";
import format from "date-fns/format";
import compareAsc from "date-fns/compare_asc";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
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
                    <div className="tile is-child is-paddingless box position-relative">
                        <figure className="image is-3by2">
                            <img className="rounded" src={apod.hdurl} />
                        </figure>
                        <div className="is-overlay p-3">
                            <p className="subtitle has-text-white is-size-7-mobile">
                                Astronomy Picture of the Day
                            </p>
                            <p className="title has-text-light is-size-6-mobile">{apod.title}</p>
                        </div>
                    </div>
                </div>
                <div className="tile is-4 is-parent is-vertical">
                    <div className="title is-child notification is-warning">
                        <p className="title is-size-4 is-size-6-mobile">Near Earth Objects</p>
                        <div className="level is-mobile">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Today</p>
                                    <p className="title">
                                        {neos.today.element_count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">All Time</p>
                                    <p className="title">
                                        {neos.stats.near_earth_object_count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Close Approaches</p>
                                    {/* <p className="is-size-7 has-text-dark">As of Today</p> */}
                                    <p className="title">
                                        {neos.stats.close_approach_count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="title is-child notification is-danger">
                        <p className="title is-size-4 is-size-6-mobile">SpaceX</p>
                        <div className="level is-mobile">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Launches</p>
                                    <p className="title">
                                        {spacexData.launches.count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Success</p>
                                    <p className="title">
                                        {spacexData.launches.success_count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Failed</p>
                                    <p className="title">
                                        {spacexData.launches.failure_count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="level is-mobile">
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Next Launch</p>
                                    <p className="title is-size-6 has-text-weight-semibold">
                                        {format(
                                            new Date(spacexData.launches.next.launch_date_local),
                                            "MM-DD-YYYY"
                                        )}
                                    </p>
                                    <p className="is-size-6 has-text-weight-semibold">
                                        {spacexData.launches.next.site.location.name}
                                    </p>
                                </div>
                            </div>
                        </div>
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
