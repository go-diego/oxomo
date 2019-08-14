import InfoCard from "./InfoCard";
import PostCard from "./PostCard";

export default function NeoTile({ isLoading, data }) {
    let velocityInKmPerS,
        distanceInMiles,
        formattedName = null;

    if (data) {
        console.log("DATA", data);
        const { name, close_approach_data } = data;
        formattedName = name.replace("(", "").replace(")", "");
        velocityInKmPerS =
            close_approach_data[0].relative_velocity.kilometers_per_second;
        distanceInMiles = close_approach_data[0].miss_distance.miles;
    }
    return (
        <PostCard
            isReversed
            src="https://www.jpl.nasa.gov/images/asteroid/20180723/main-animation-16.gif"
            isLoading={isLoading}
            alt="Near Earth Objects"
            title="Near Earth Objects"
            subtitle="Closest Approach Today">
            <div className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">Name</p>
                        <p className="title is-size-6">{formattedName}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">Velocity</p>
                        <p className="title is-size-6">
                            {`${parseFloat(velocityInKmPerS)
                                .toPrecision(3)
                                .toLocaleString()} `}
                            <sup>km</sup>&frasl;<sub>s</sub>
                        </p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">Distance</p>
                        <p className="title is-size-6">
                            {`${Math.ceil(
                                distanceInMiles
                            ).toLocaleString()} mi`}
                        </p>
                    </div>
                </div>
            </div>
        </PostCard>
    );
}
