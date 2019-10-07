/**
 * TODO:
 * add validation if date > new Date()
 * add skeleton components
 * add error handling
 */

import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { to } from "await-to-js";
import format from "date-fns/format";
import { Base64 } from "js-base64";
import Section from "../components/Section";
import Nav from "../components/Nav";
import MainLayout from "../containers/MainLayout";
import ApodReel from "../components/ApodReel";
import Image from "../components/Image";
import Loading from "../components/Loading";
import { APOD } from "../api/nasa.api";

const nasaApodApi = new APOD();

const Content = styled(Section)`
    margin-top: ${props => (!props.isLoading ? "-6rem" : "")};
`;

const Body = styled.div`
    padding-top: 2.5rem;
    padding-bottom: 6rem;
`;

const Hero = styled.section`
    background-color: #101d2e;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%2333f1ed' fill-opacity='0.12' fill-rule='evenodd'/%3E%3C/svg%3E");
`;

const Figure = styled.figure`
    height: 100%;
`;

function AstronomyPictureOfTheDayPage() {
    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        if (id) {
            async function getAstronomyPictureOfTheDay() {
                const [error, response] = await to(
                    nasaApodApi.get(
                        format(
                            new Date(
                                Base64.decode(id)
                                    .replace(/-/g, "/")
                                    .replace("T", " ")
                            ),
                            "YYYY-MM-DD"
                        )
                    )
                );
                if (error) setIsError(true);

                setData(response);
                setIsLoading(false);
            }
            getAstronomyPictureOfTheDay();
        }
    }, [id]);

    return (
        <MainLayout>
            <Hero className="hero is-medium is-dark">
                <div className="hero-head">
                    <Nav />
                </div>
                <Body className="hero-body">
                    <div className="container">
                        <h1 className="is-family-secondary has-text-centered title is-size-4-mobile">
                            Astronomy Picture of the Day
                        </h1>
                        {id && (
                            <h2 className="subtitle has-text-centered title">
                                {format(
                                    new Date(
                                        Base64.decode(id)
                                            .replace(/-/g, "/")
                                            .replace("T", " ")
                                    ),
                                    "ddd, MMM Do"
                                )}
                            </h2>
                        )}
                    </div>
                </Body>
            </Hero>
            <Content isLoading={isLoading}>
                {isLoading && <Loading />}
                {!isLoading && (
                    <div className="columns box is-paddingless is-clipped">
                        <div className="column is-paddingless has-background-dark">
                            <Figure className="image">
                                <Image
                                    loaderColor="#33f1ed"
                                    isLoading={isLoading}
                                    src={data && data.hdurl}
                                />
                            </Figure>
                        </div>
                        <div className="column">
                            <h1 className="title is-size-4-mobile">
                                {data && data.title}
                            </h1>
                            <h2 className="subtitle">
                                {data && data.copyright}
                            </h2>
                            <div className="content">
                                {data && <p>{data.explanation}</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Content>
            <Section>
                <ApodReel />
            </Section>
        </MainLayout>
    );
}

export default AstronomyPictureOfTheDayPage;
