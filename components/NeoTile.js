import InfoCard from "./InfoCard";

export default function NeoTile({ isLoading, data }) {
    let name,
        close_approach_data,
        velocityInKmPerS,
        distanceInMiles,
        formattedName = null;

    if (data) {
        const { name, close_approach_data } = data;
        formattedName = name.replace("(", "").replace(")", "");
        velocityInKmPerS =
            close_approach_data[0].relative_velocity.kilometers_per_second;
        distanceInMiles = close_approach_data[0].miss_distance.miles;
    }
    return (
        (!isLoading && (
            <InfoCard className="is-warning">
                <p className="title is-size-4">Near Earth Objects</p>
                <p className="subtitle is-6">Closest Approach Today</p>
                <div className="d-flex flex-column pt-4">
                    <div className="level is-mobile">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading mb-1">Name</p>
                                <p className="title is-size-6">
                                    {formattedName}
                                </p>
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
                </div>
            </InfoCard>
        )) || <p>Loading...</p>
    );
}
