import styled from "styled-components";
import Emoji from "react-emoji-render";
import PostCard from "./PostCard/index";

const LevelItem = styled.div`
    flex-grow: 0 !important;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
`;

const Alert = styled.span`
    z-index: 5;
    position: relative;
    cursor: pointer;
`;

const InfoIcon = styled.span`
    z-index: 5;
    position: relative;
    cursor: pointer;
    font-size: 1.25rem;
`;

export default function NeoTile({ isLoading, data }) {
    let velocityInMilesPerSecond,
        distanceInMiles,
        diameter,
        isPotentiallyHazardous,
        formattedName = null;

    if (data) {
        const {
            name,
            close_approach_data,
            estimated_diameter,
            is_potentially_hazardous_asteroid
        } = data;
        isPotentiallyHazardous = is_potentially_hazardous_asteroid;
        diameter = estimated_diameter.meters.estimated_diameter_min;
        formattedName = name.replace("(", "").replace(")", "");
        velocityInMilesPerSecond =
            close_approach_data[0].relative_velocity.miles_per_hour / 60 / 60;
        distanceInMiles = close_approach_data[0].miss_distance.miles;
    }
    return (
        <PostCard
            isReversed
            src="https://www.jpl.nasa.gov/images/asteroid/20180723/main-animation-16.gif"
            isLoading={isLoading && !data}
            alt="Near Earth Objects"
            title="Near Earth Objects"
            subtitle="Closest Approach Today">
            <Content>
                <p className="title is-5 ">
                    {isPotentiallyHazardous && (
                        <Alert title="Because of its distance and size, this NEO has been classified as Potentially Hazardous">
                            <Emoji text=":rotating_light:" />
                        </Alert>
                    )}
                    {formattedName}
                </p>
                <div className="level is-mobile">
                    <LevelItem className="level-item ">
                        <div>
                            <p className="heading mb-1">Diameter</p>
                            <p className="title is-size-6">
                                {`${Math.ceil(diameter).toLocaleString()} m`}
                            </p>
                        </div>
                    </LevelItem>
                    <LevelItem className="level-item ">
                        <div>
                            <p className="heading mb-1">Velocity</p>
                            <p className="title is-size-6">
                                {`${parseFloat(velocityInMilesPerSecond)
                                    .toPrecision(3)
                                    .toLocaleString()} `}
                                <sup>mi</sup>&frasl;
                                <sub>s</sub>
                            </p>
                        </div>
                    </LevelItem>
                    <LevelItem className="level-item ">
                        <div>
                            <p className="heading mb-1">Distance</p>
                            <p className="title is-size-6">
                                {`${Math.ceil(
                                    distanceInMiles
                                ).toLocaleString()} mi`}
                            </p>
                        </div>
                    </LevelItem>
                </div>
                <p>
                    <InfoIcon title="Did you know?">&#9432;</InfoIcon> The
                    distance between Earth and the Moon? <b>238,900 mi</b>
                </p>
            </Content>
        </PostCard>
    );
}
