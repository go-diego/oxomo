import React from "react";
import format from "date-fns/format";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";

import NasaAPI from "../api/nasa.api";
const nasa = new NasaAPI();

const Home = ({apod, neosForToday}) => (
    <MainLayout>
        <HomeHero />
        <section className="section container">
            <div className="tile is-ancestor">
                <div className="tile is-8 is-parent">
                    <div className="tile is-child box">
                        <p class="subtitle">Astronomy Picture of the Day</p>
                        <p className="title">{apod.title}</p>
                        <figure className="image is-3by2">
                            <img src={apod.hdurl} />
                        </figure>
                    </div>
                </div>
                <div className="tile is-4 is-vertical" />
            </div>
            {/* <div classNameName="card">
                <header classNameName="card-header">
                    <p classNameName="card-header-title">Astronomy Picture of the Day</p>
                </header>
                <div classNameName="card-image">
                    <figure classNameName="image is-4by3">
                        <img src={apod.hdurl} alt={apod.title} />
                    </figure>
                </div>
                <div classNameName="card-content">
                    <div classNameName="media">
                        <div classNameName="media-left">
                            <figure classNameName="image is-48x48">
                                <img
                                    src="https://bulma.io/images/placeholders/96x96.png"
                                    alt="Placeholder image"
                                />
                            </figure>
                        </div>
                        <div classNameName="media-content">
                            <p classNameName="title is-4">John Smith</p>
                            <p classNameName="subtitle is-6">@johnsmith</p>
                        </div>
                    </div>

                    <div classNameName="content">
                       {apod.explanation}
                        <br />
                        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                </div>
            </div>
            <div>
                <h3>Near Earth Objects</h3>
                <p>
                    Count for today: <b>{neosForToday.element_count}</b>
                </p>
            </div> */}
        </section>
    </MainLayout>
);

Home.getInitialProps = async ({req}) => {
    const startDate = format(new Date(), "YYYY-MM-DD");
    const endDate = startDate;

    const apod = await nasa.getAstronomyPictureOfTheDay();
    const neosForToday = await nasa.getNearEarthObjectsFeed(startDate, endDate);

    console.log("APPOD", apod);
    //console.log("neosForToday", neosForToday);

    return {
        apod,
        neosForToday
    };
};

export default Home;
