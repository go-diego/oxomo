import React from "react";
import format from "date-fns/format";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";

import NasaAPI from "../api/nasa.api";
const nasa = new NasaAPI();

const Home = ({apod, neosForToday, neoStatistics}) => (
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
                                        {neosForToday.element_count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">All Time</p>
                                    <p className="title">
                                        {neoStatistics.near_earth_object_count.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="level-item has-text-centered">
                                <div>
                                    <p className="heading">Close Approaches</p>
                                    {/* <p className="is-size-7 has-text-dark">As of Today</p> */}
                                    <p className="title">
                                        {neoStatistics.close_approach_count.toLocaleString()}
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

Home.getInitialProps = async ({req}) => {
    const startDate = format(new Date(), "YYYY-MM-DD");
    const endDate = startDate;

    const apod = await nasa.getAstronomyPictureOfTheDay();
    const neosForToday = await nasa.getNearEarthObjectsFeed(startDate, endDate);
    const neoStatistics = await nasa.getNeoStatistics();

    /**
     * TODO: use this to get closest NEO
     */
    const neosWithNearApproaches = Object.values(neosForToday.near_earth_objects)[0].filter(
        neo => neo.close_approach_data.length > 0
    );

    //const closestNeoT
    //const neosWithNearApproaches = Object.values(neosForToday.near_earth_objects);
    //console.log("neosWithNearApproaches", neosWithNearApproaches);
    //console.log("APPOD", apod);
    //console.log("neosForToday", neosForToday);
    //console.log("neoStatistics", neoStatistics);

    return {
        apod,
        neosForToday,
        neoStatistics
    };
};

export default Home;
