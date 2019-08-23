import React from "react";
import InfoCard from "./InfoCard";
import RoadsterImage from "../images/roadster.svg";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        height={150}
        width={300}
        speed={1}
        primaryColor={"#333"}
        secondaryColor={"#212121"}>
        <rect x="6" y="5" rx="0" ry="0" width="95%" height="30" />
        <rect x="6" y="40" rx="0" ry="0" width="95%" height="15" />
        <rect x="6" y="80" rx="0" ry="0" width="95%" height="5" />
        <rect x="6" y="90" rx="0" ry="0" width="95%" height="5" />
        <rect x="6" y="100" rx="0" ry="0" width="95%" height="5" />
    </ContentLoader>
);

export default function RoadsterTile({ data, isLoading }) {
    let earth_distance_mi,
        details,
        distanceFromEarthInMiles = null;

    if (data) {
        ({ earth_distance_mi, details } = data);
        distanceFromEarthInMiles = Math.floor(
            earth_distance_mi
        ).toLocaleString();
    }

    return (
        <InfoCard className="is-dark">
            {(!isLoading && (
                <React.Fragment>
                    <div className="columns">
                        <div className="column">
                            <figure className="image is-3by2">
                                <img className="rounded" src={RoadsterImage} />
                            </figure>
                        </div>
                        <div className="column">
                            <p className="title has-text-light is-size-6-mobile">
                                Where in the solar system is Musk's Roadster?
                            </p>
                            <div>
                                <h3 className="title has-text-white">
                                    {distanceFromEarthInMiles}
                                </h3>
                                <h6 className="subtitle is-uppercase has-text-white">
                                    Miles From Earth
                                </h6>
                            </div>
                        </div>
                    </div>
                    <p>{details}</p>
                </React.Fragment>
            )) || <Skeleton />}
        </InfoCard>
    );
}
