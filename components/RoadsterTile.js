// import Roadster from "../static/roadster.svg";

export default function RoadsterTile(props) {
    return (
        <div className="position-relative">
            <figure className="image is-3by2">
                {/* <img className="rounded" src={Roadster} /> */}
                <img className="rounded" src="./static/roadster.svg" />
            </figure>
            <div className="is-overlay p-3">
                <p className="title has-text-light is-size-6-mobile">
                    Where in the solar system is Musk's Roadster?
                </p>
            </div>
        </div>
    );
}
