import React from "react";
import format from "date-fns/format";
import styled from "styled-components";
import ContentLoader from "react-content-loader";
import InfoCard from "./InfoCard";

const CardTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 1rem;
`;

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

export default function SpaceXNextLaunchTile({ data, isLoading }) {
    let links,
        rocket,
        launch_site,
        mission_name,
        launch_date_local,
        mission_patch_small,
        rocketName,
        siteLocationName,
        article_link,
        details,
        wikipedia = null;

    if (data) {
        ({
            links,
            launch_site,
            rocket,
            mission_name,
            launch_date_local,
            details
        } = data);
        ({ mission_patch_small, article_link, wikipedia } = links);
        rocketName = rocket.rocket_name;
        siteLocationName = launch_site.site_name_long;
    }

    return (
        <InfoCard isLoading={isLoading} className="is-danger">
            {(!isLoading && (
                <React.Fragment>
                    <CardTitle>
                        <p className="subtitle is-size-7 is-uppercase is-marginless is-size-7-mobile">
                            Next Launch
                        </p>
                        <div>
                            {mission_patch_small && (
                                <figure className="image is-48x48">
                                    <img
                                        className="is-rounded"
                                        src={mission_patch_small}
                                    />
                                </figure>
                            )}
                            <h2 className="title">{mission_name}</h2>
                        </div>
                    </CardTitle>
                    <div className="columns">
                        <div className="column">
                            <div className="level is-mobile is-marginless">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading is-marginless is-size-3">
                                            {format(
                                                new Date(launch_date_local),
                                                "ddd"
                                            )}
                                        </p>
                                        <p className="heading is-marginless is-size-6">
                                            {format(
                                                new Date(launch_date_local),
                                                "MMMM"
                                            )}
                                        </p>
                                        <p className="title is-display-1">
                                            {format(
                                                new Date(launch_date_local),
                                                "DD"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <p>{details}</p>
                        </div>
                    </div>
                    <p className="has-text-centered">{`Blast off from ${siteLocationName} on ${rocketName}`}</p>
                </React.Fragment>
            )) || <Skeleton />}
        </InfoCard>
    );
}
