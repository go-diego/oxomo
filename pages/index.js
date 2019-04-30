/**
 * --Refactor as static app + move to netlify
 * redesign ui
 * --remove rss-parser
 * --upgrade dependecies
 * --remove bootstrap dependency
 * --define bulma palette
 * --add styled-components
 * --add google analytics
 * refactor code
 */

import Link from "next/link";
import HomeHero from "../components/HomeHero";
import NasaSection from "../components/NasaSection";
import SpacexSection from "../components/SpacexSection";
import MarsSection from "../components/MarsSection";
import MainLayout from "../containers/MainLayout";

const Home = () => (
    <MainLayout>
        <HomeHero />
        <NasaSection />
        <MarsSection />
        <SpacexSection />
    </MainLayout>

    //{/* <a href='https://www.freepik.com/free-vector/colorful-mars-background-with-flat-design_3231758.htm'>Designed by Freepik</a> */}
);

export default Home;
