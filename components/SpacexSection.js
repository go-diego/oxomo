// import TileErrorBoundary from "./TileErrorBoundary";
// import RoadsterTile from "./RoadsterTile";
// import SpacexNextLaunchTile from "./SpacexNextLaunchTile";

import React from "react";
import { to } from "await-to-js";
import SpacexLatestLaunchTile from "./SpacexLatestLaunchTile";
import SpaceX from "../api/spacex.api";

const spacexApi = new SpaceX();

export default function SpacexSection() {
    const [isLatestLaunchLoading, setIsLatestLaunchLoading] = React.useState(
        true
    );
    const [latestLaunch, setLatestLaunch] = React.useState(null);

    React.useEffect(() => {
        async function getLatestLaunch() {
            const [error, latestLaunchResponse] = await to(
                spacexApi.getLatestLaunch()
            );
            if (error) console.log("LATEST LAUNCH ERROR", error);
            setLatestLaunch(latestLaunchResponse);
            setIsLatestLaunchLoading(false);
            console.log("latestLaunchResponse", latestLaunchResponse);
        }
        getLatestLaunch();
    }, []);

    return (
        <div className="columns">
            <div className="column">
                <SpacexLatestLaunchTile
                    isLoading={isLatestLaunchLoading}
                    data={latestLaunch}
                />
            </div>
        </div>
        // <section className="section">
        //     <div className="container">
        //         <h2 className="title">SpaceX Scoop</h2>
        //         <div className="tile is-ancestor">
        //             <div className="tile is-parent is-vertical is-4">
        //                 <TileErrorBoundary>
        //                     <RoadsterTile />
        //                 </TileErrorBoundary>
        //                 <TileErrorBoundary>
        //                     <SpacexNextLaunchTile />
        //                 </TileErrorBoundary>
        //             </div>
        //             <div className="tile is-vertical">
        //                 <div className="tile is-parent">
        //                     <TileErrorBoundary>
        //                         <SpacexLatestLaunchTile />
        //                     </TileErrorBoundary>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
}
