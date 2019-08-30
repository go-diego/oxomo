import styled from "styled-components";
import Hero from "../components/Hero";
import Section from "../components/Section";
import MainLayout from "../containers/MainLayout";

const Content = styled(Section)`
    margin-top: -6rem;
`;

function WhatIsThisPage() {
    return (
        <MainLayout>
            <Hero />
            <Content>
                <div className="content box">
                    <h2>What is this?</h2>
                    <p>
                        At the moment, Oxomo is an unofficial side-project. It
                        serves to experiment with API and data scraping from
                        these different space news sources as a way to showcase
                        my skills as a front-end engineer.
                    </p>
                    <p>
                        Have any feedback? Have any questions? Are you a
                        beginner web developer and would like to know how this
                        works?{" "}
                        <a
                            className="has-text-black has-text-weight-bold"
                            href="mailto:hola@godiego.me">
                            Email me
                        </a>{" "}
                        or find me on{" "}
                        <a
                            className="has-text-black has-text-weight-bold"
                            href="https://www.facebook.com/diego.bernal.91"
                            target="_blank"
                            rel="noopener">
                            Facebook
                        </a>
                        .
                    </p>
                    <h2>Why Oxomo?</h2>
                    <p>
                        Oxomoco, or Oxomo for short, is the Aztec goddess of
                        night, who, along with her husband Cipactonal, is in
                        charge of the Aztec calendar. So, she’s the perfect
                        figure for a web app that collects daily space news from
                        across the web seamlessly in one place.
                    </p>
                </div>
            </Content>
        </MainLayout>
    );
}

export default WhatIsThisPage;
