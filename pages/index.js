import React from "react";
import format from "date-fns/format";

import HomeHero from "../components/HomeHero";
import Link from "next/link";

import MainLayout from "../containers/MainLayout";

import NasaAPI from "../api/nasa.api";

const nasa = new NasaAPI();

const Home = ({apod, neosForToday}) => (
    <MainLayout>
        <HomeHero />
        <section className="section">
            <div>
                <h3>Picture of the Day</h3>
                <img src={apod.hdurl} width="200" />
                <small>{apod.title}</small>
            </div>
            <div>
                <h3>Near Earth Objects</h3>
                <p>
                    Count for today: <b>{neosForToday.element_count}</b>
                </p>
            </div>
        </section>
    </MainLayout>
);

Home.getInitialProps = async ({req}) => {
    const startDate = format(new Date(), "YYYY-MM-DD");
    const endDate = startDate;

    const apod = await nasa.getAstronomyPictureOfTheDay();
    const neosForToday = await nasa.getNearEarthObjectsFeed(startDate, endDate);

    //console.log("APPOD", apod);
    //console.log("neosForToday", neosForToday);

    return {
        apod,
        neosForToday
    };
};

export default Home;
