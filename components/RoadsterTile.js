import Roadster from "../images/roadster.svg";

export default function RoadsterTile(props) {
    return (
        <div className="position-relative h-100">
            <figure className="image is-3by2">
                <img className="rounded" src={Roadster} />
            </figure>
            <div className="is-overlay p-3 d-flex flex-column justify-content-between">
                <p className="subtitle has-text-light is-size-6-mobile">
                    Where in the solar system is Musk's Roadster?
                </p>
                <div>
                    <h3 className="title has-text-white">
                        {Math.floor(props.earth_distance_mi).toLocaleString()}
                    </h3>
                    <h6 className="subtitle is-uppercase has-text-white">Miles From Earth</h6>
                </div>
            </div>
        </div>
    );
}
