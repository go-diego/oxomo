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
import { APOD } from "../api/nasa.api";

const nasaApodApi = new APOD();

const Content = styled(Section)`
    margin-top: -6rem;
`;

const Body = styled.div`
    padding-top: 2.5rem;
    padding-bottom: 6rem;
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
            <div className="hero is-medium is-dark is-bold">
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
            </div>
            <Content>
                <div className="columns box is-paddingless is-clipped">
                    <div className="column is-paddingless">
                        <figure className="image">
                            <Image
                                isLoading={isLoading}
                                src={data && data.hdurl}
                            />
                        </figure>
                    </div>
                    <div className="column">
                        <h1 className="title is-size-4-mobile">
                            {data && data.title}
                        </h1>
                        <h2 className="subtitle">{data && data.copyright}</h2>
                        <div className="content">
                            {data && <p>{data.explanation}</p>}
                        </div>
                    </div>
                </div>
            </Content>
            <Section>
                <ApodReel />
            </Section>
        </MainLayout>
    );
}

export default AstronomyPictureOfTheDayPage;
