import TileErrorBoundary from "./TileErrorBoundary";
import ApodTile from "./ApodTile";
import NeoTile from "./NeoTile";
import NasaNewsTile from "./NasaNewsTile";

export default function NasaSection() {
    return (
        <section className="section">
            <div className="container">
                <h1 className="title">NASA News</h1>
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-8">
                        <div className="tile is-parent">
                            <TileErrorBoundary>
                                <ApodTile />
                            </TileErrorBoundary>
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                        <TileErrorBoundary>
                            <NasaNewsTile />
                        </TileErrorBoundary>
                        <TileErrorBoundary>
                            <NeoTile />
                        </TileErrorBoundary>
                    </div>
                </div>
            </div>
        </section>
    );
}
