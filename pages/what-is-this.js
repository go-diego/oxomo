import Link from "next/link";
import styled from "styled-components";
import Hero from "../components/Hero";
import Section from "../components/Section";
import MainLayout from "../containers/MainLayout";

const Content = styled(Section)`
    margin-top: -6rem;
`;

function Home() {
    return (
        <MainLayout>
            <Hero />
            <Content>
                <div className="content box">
                    <h2>What is this?</h2>
                    <p>
                        Oxomo is a web project that collects the latest in space
                        news from several different digital sources and
                        summarizes it on one web page.
                    </p>
                    <p>
                        At the moment, Oxomo is a side-project that I work on in
                        my spare time. Mainly, it serves as practice,
                        experimentation, and as a way to showcase my skills as a
                        front-end engineer.
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
                </div>
            </Content>
        </MainLayout>
    );
}

export default Home;
