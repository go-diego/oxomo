import styled from "styled-components";
import Nav from "../components/Nav";
import Section from "../components/Section";
import MainLayout from "../containers/MainLayout";

const Content = styled(Section)`
    margin-top: -6rem;
`;

const Body = styled.div`
    padding-top: 2.5rem;
    padding-bottom: 6rem;
`;

const Hero = styled.section`
    background-color: #101d2e;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%2333f1ed' fill-opacity='0.12' fill-rule='evenodd'/%3E%3C/svg%3E");
`;

function WhatIsThisPage() {
    return (
        <MainLayout>
            <Hero className="hero is-medium is-dark">
                <div className="hero-head">
                    <Nav />
                </div>
                <Body className="hero-body">
                    <div className="container">
                        <h1 className="is-family-secondary has-text-centered title is-size-4-mobile">
                            What is OXOMO?
                        </h1>
                    </div>
                </Body>
            </Hero>
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
                        Oxomoco{" "}
                        <span className="has-text-grey">
                            (oh&ndash;sho&ndash;mo&ndash;co)
                        </span>
                        , or Oxomo for short, is the Aztec goddess of night,
                        who, along with her husband Cipactonal, is in charge of
                        the Aztec calendar. So, she’s the perfect figure for a
                        web app that collects daily space news from across the
                        web seamlessly in one place.
                    </p>
                </div>
            </Content>
        </MainLayout>
    );
}

export default WhatIsThisPage;
