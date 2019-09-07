import React from "react";
import Link from "next/link";
import styled from "styled-components";
import format from "date-fns/format";
import addDays from "date-fns/add_days";
import { Base64 } from "js-base64";
import { APOD } from "../api/nasa.api";

const nasaApodApi = new APOD();

const Img = styled.img`
    height: 100% !important;
    object-fit: cover;
`;

const Figure = styled.figure`
    width: 100% !important;
`;

export default function ApodReel() {
    const [reel, setReel] = React.useState(null);

    React.useEffect(() => {
        async function getApodReel() {
            const dates = new Array(7)
                .fill(null)
                .map((item, index) => addDays(new Date(), -1 * index));

            const promises = dates.map(day =>
                nasaApodApi.get(format(day, "YYYY-MM-DD"))
            );
            const responses = await Promise.all(
                promises.map(promise => promise.catch(error => error))
            );
            setReel(responses);
        }
        getApodReel();
    }, []);

    return (
        <div>
            <h1 className="heading">
                In case you missed it, here are this week's APODs
            </h1>
            <div className="columns">
                {reel &&
                    reel.map((item, i) => {
                        return (
                            <div key={i} className="column">
                                <Link
                                    href={`/apod?id=${Base64.encode(
                                        format(
                                            `${item.date}T00:00:00`,
                                            "YYYY-MM-DDTHH:mm:ss"
                                        )
                                    )}`}>
                                    <a className="has-text-dark">
                                        <small>
                                            {format(
                                                new Date(
                                                    `${item.date}T00:00:00`
                                                ),
                                                "MMM Do"
                                            )}
                                        </small>
                                        <Figure className="image is-128x128">
                                            <Img src={item.url} />
                                        </Figure>
                                        <small>{item.title}</small>
                                    </a>
                                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
