import TileErrorBoundary from "./TileErrorBoundary";
import MarsNewsTile from "../components/MarsNewsTile";
import CuriosityMissionTile from "../components/CuriosityMissionTile";
import ScienceDailyMarsNews from "../components/ScienceDailyMarsNews";
import MarsImage from "../images/mars-landscape.jpg";

export default function MarsSection() {
    return (
        <section
            className="section"
            style={{
                backgroundImage: `url(${MarsImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
            }}>
            <div className="container">
                <h2 className="title">Mars Memo</h2>
                <div className="tile is-ancestor">
                    {/* <div className="tile is-12">
                    <div className="tile is-parent">
                        <article className="tile is-child notification has-background-grey-dark has-text-light">
                            <MarsTile {...marsData} />
                        </article>
                    </div>
                </div> */}
                    <div className="tile is-12">
                        <div className="tile is-parent">
                            <TileErrorBoundary>
                                <MarsNewsTile />
                            </TileErrorBoundary>
                        </div>
                        <div className="tile is-parent">
                            <TileErrorBoundary>
                                <CuriosityMissionTile />
                            </TileErrorBoundary>
                        </div>
                        <div className="tile is-parent">
                            <TileErrorBoundary>
                                <ScienceDailyMarsNews />
                            </TileErrorBoundary>
                        </div>
                    </div>
                </div>
                {/* <div className="tile is-ancestor">
                <div className="tile is-12">
                    {marsData.rovers.map((rover, i) => {
                        return (
                            <div key={i} className="tile is-parent">
                                <article className="tile is-child">
                                    <RoverTile {...rover} />
                                </article>
                            </div>
                        );
                    })}
                </div>
            </div> */}
            </div>
        </section>
    );
}
