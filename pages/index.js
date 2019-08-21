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
import styled from "styled-components";
import Hero from "../components/Hero";
import Section from "../components/Section";
import NasaSection from "../components/NasaSection";
import SpacexSection from "../components/SpacexSection";
import MarsSection from "../components/MarsSection";
import MainLayout from "../containers/MainLayout";

const Content = styled(Section)`
    margin-top: -8rem;
`;

function Home() {
    return (
        <MainLayout>
            <Hero />
            <Content>
                <NasaSection />
                <MarsSection />
                <SpacexSection />
            </Content>
        </MainLayout>
    );
}

//{/* <a href='https://www.freepik.com/free-vector/colorful-mars-background-with-flat-design_3231758.htm'>Designed by Freepik</a> */}

export default Home;
