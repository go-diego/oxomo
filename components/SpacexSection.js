import TileErrorBoundary from "./TileErrorBoundary";
import RoadsterTile from "./RoadsterTile";
import SpacexNextLaunchTile from "./SpacexNextLaunchTile";
import SpacexLatestLaunchTile from "./SpacexLatestLaunchTile";

export default function SpacexSection() {
    return (
        <section className="section">
            <div className="container">
                <h2 className="title">SpaceX Scoop</h2>
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-vertical is-4">
                        <TileErrorBoundary>
                            <RoadsterTile />
                        </TileErrorBoundary>
                        <TileErrorBoundary>
                            <SpacexNextLaunchTile />
                        </TileErrorBoundary>
                    </div>
                    <div className="tile is-vertical">
                        <div className="tile is-parent">
                            <TileErrorBoundary>
                                <SpacexLatestLaunchTile />
                            </TileErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
