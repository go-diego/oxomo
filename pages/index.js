import Link from "next/link";
import styled from "styled-components";
import Hero from "../components/Hero";
import Section from "../components/Section";
import NasaSection from "../components/NasaSection";
import SpacexSection from "../components/SpacexSection";
import MarsSection from "../components/MarsSection";
import MainLayout from "../containers/MainLayout";
import PhysOrgNews from "../components/PhysOrgNews";

const Content = styled(Section)`
    margin-top: -6rem;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: end;
`;

function Home() {
    return (
        <MainLayout>
            <Hero />
            <Content>
                {/* <Nav>
                    <p className="heading has-text-white">Show some love</p>
                </Nav> */}
                <NasaSection />
                <MarsSection />
                <SpacexSection />
                <div className="columns">
                    <div className="column">
                        <PhysOrgNews type="space-exploration" />
                    </div>
                    <div className="column">
                        <PhysOrgNews type="astrobiology" />
                    </div>
                    <div className="column">
                        <PhysOrgNews type="astronomy" />
                    </div>
                </div>
            </Content>
        </MainLayout>
    );
}

export default Home;
