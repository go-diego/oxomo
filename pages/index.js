import format from "date-fns/format";
import Link from "next/link";
import HomeHero from "../components/HomeHero";
import NasaSection from "../components/NasaSection";
import SpacexSection from "../components/SpacexSection";
import MarsSection from "../components/MarsSection";
import MainLayout from "../containers/MainLayout";

import "../styles/site.scss";

const Home = () => (
    <MainLayout>
        <HomeHero />
        <h1 className="is-display-4 py-3 has-text-centered">{format(new Date(), "ddd, MMM Do")}</h1>
        <NasaSection />
        <MarsSection />
        <SpacexSection />
    </MainLayout>

    //{/* <a href='https://www.freepik.com/free-vector/colorful-mars-background-with-flat-design_3231758.htm'>Designed by Freepik</a> */}
);

export default Home;
