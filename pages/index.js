import Link from "next/link";
import styled from "styled-components";
import Hero from "../components/Hero";
import Section from "../components/Section";
import NasaSection from "../components/NasaSection";
import SpacexSection from "../components/SpacexSection";
import MarsSection from "../components/MarsSection";
import SpaceComSection from "../components/SpaceComSection";
import MainLayout from "../containers/MainLayout";
import PhysOrgNews from "../components/PhysOrgNews";
import Head from "../components/Head";

const Content = styled(Section)`
    margin-top: -6rem;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: end;
`;

const Column = styled.div`
    display: flex;
`;

const pageDescription = "Get your daily dose of space news from Oxomo.";
const pageTitle = "OXOMO | Space News";

function Home() {
    return (
        <MainLayout description="The latest in space news.">
            <Head description={pageDescription} title={pageTitle} />
            <Hero />
            <Content>
                {/* <Nav>
                    <p className="heading has-text-white">Show some love</p>
                </Nav> */}
                <NasaSection />
                <SpaceComSection />
                <MarsSection />
                <SpacexSection />
                <div className="columns">
                    <Column className="column">
                        <PhysOrgNews type="space-exploration" />
                    </Column>
                    <Column className="column">
                        <PhysOrgNews type="astrobiology" />
                    </Column>
                    <Column className="column">
                        <PhysOrgNews type="astronomy" />
                    </Column>
                </div>
            </Content>
        </MainLayout>
    );
}

export default Home;
