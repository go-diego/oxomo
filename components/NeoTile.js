import {Fragment} from "react";

export default function NeoTile(props) {
    const {today, stats, closestApproachToday} = props;
    return (
        <Fragment>
            <p className="title is-size-4">Near Earth Objects</p>
            <p className="subtitle is-6">Closest Approach Today</p>
            <div className="d-flex flex-column pt-4">
                <div className="level is-mobile">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading mb-1">Name</p>
                            <p className="title is-size-6">
                                {`${closestApproachToday.name.replace("(", "").replace(")", "")}`}
                            </p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading mb-1">Velocity</p>
                            <p className="title is-size-6">
                                {`${parseFloat(
                                    closestApproachToday.close_approach_data[0].relative_velocity
                                        .kilometers_per_second
                                )
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
                                    closestApproachToday.close_approach_data[0].miss_distance.miles
                                ).toLocaleString()} mi`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

{
}
