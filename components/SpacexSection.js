// import TileErrorBoundary from "./TileErrorBoundary";
// import SpacexNextLaunchTile from "./SpacexNextLaunchTile";

import React from "react";
import { to } from "await-to-js";
import compareAsc from "date-fns/compare_asc";
import styled from "styled-components";
import SpacexLatestLaunchTile from "./SpacexLatestLaunchTile";
import SpacexNextLaunchTile from "./SpacexNextLaunchTile";
import RoadsterTile from "./RoadsterTile";
import SpaceX from "../api/spacex.api";

const spacexApi = new SpaceX();

const Column = styled.div`
    display: flex;
`;

export default function SpacexSection() {
    const [isLatestLaunchLoading, setIsLatestLaunchLoading] = React.useState(
        true
    );
    const [latestLaunch, setLatestLaunch] = React.useState(null);
    const [isNextLaunchLoading, setIsNextLaunchLoading] = React.useState(true);
    const [nextLaunch, setNextLaunch] = React.useState(null);
    const [isRoadsterDataLoading, setIsRoadsterDataLoading] = React.useState(
        true
    );
    const [roadasterData, setRoadsterData] = React.useState(null);

    React.useEffect(() => {
        async function getLatestLaunch() {
            const [error, latestLaunchResponse] = await to(
                spacexApi.getLatestLaunch()
            );
            if (error) console.log("LATEST LAUNCH ERROR", error);
            setLatestLaunch(latestLaunchResponse);
            setIsLatestLaunchLoading(false);
            // console.log("latestLaunchResponse", latestLaunchResponse);
        }
        getLatestLaunch();
    }, []);

    React.useEffect(() => {
        async function getNextLaunch() {
            const [error, upcomingLaunchesResponse] = await to(
                spacexApi.getUpcomingLaunches()
            );
            if (error) console.log("UPCOMING LAUNCHES ERROR", error);
            const nextLaunch = upcomingLaunchesResponse.filter(
                launch =>
                    compareAsc(new Date(launch.launch_date_local), new Date()) >
                    0
            )[0];
            setNextLaunch(nextLaunch);
            setIsNextLaunchLoading(false);
            // console.log("upcomingLaunchesResponse", upcomingLaunchesResponse);
        }
        getNextLaunch();
    }, []);

    React.useEffect(() => {
        async function getRoadsterData() {
            const [error, roadsterDataResponse] = await to(
                spacexApi.getRoadsterData()
            );
            if (error) console.log("DOADSTER DATA ERROR", error);
            setRoadsterData(roadsterDataResponse);
            setIsRoadsterDataLoading(false);
            // console.log("roadsterDataResponse", roadsterDataResponse);
        }
        getRoadsterData();
    }, []);

    return (
        <React.Fragment>
            <div className="columns">
                <div className="column">
                    <SpacexLatestLaunchTile
                        isLoading={isLatestLaunchLoading}
                        data={latestLaunch}
                    />
                </div>
            </div>
            <div className="columns">
                <Column className="column">
                    <SpacexNextLaunchTile
                        isLoading={isNextLaunchLoading}
                        data={nextLaunch}
                    />
                </Column>
                <Column className="column">
                    <RoadsterTile
                        isLoading={isRoadsterDataLoading}
                        data={roadasterData}
                    />
                </Column>
            </div>
        </React.Fragment>
    );
}
