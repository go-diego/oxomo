import React from "react";
import ErrorTile from "./ErrorTile";

import {NEO} from "../api/nasa.api";

import to from "../utils/to";

const NEOApi = new NEO();

export default class NeoTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = {...this.state};

        const neosCloseApproachTodayPromise = NEOApi.getClosestApproachToday();

        const [error, response] = await to(neosCloseApproachTodayPromise);
        if (error) state.hasError = true;

        state.data = response;
        state.isLoading = false;

        this.setState({...state});
    }

    render() {
        let name,
            close_approach_data,
            velocityInKmPerS,
            distanceInMiles,
            formattedName = null;

        const {data, hasError, isLoading} = this.state;

        if (data) {
            ({name, close_approach_data} = data);
            formattedName = name.replace("(", "").replace(")", "");
            velocityInKmPerS = close_approach_data[0].relative_velocity.kilometers_per_second;
            distanceInMiles = close_approach_data[0].miss_distance.miles;
        }
        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child p-2 notification is-warning">
                    <p className="title is-size-4">Near Earth Objects</p>
                    <p className="subtitle is-6">Closest Approach Today</p>
                    <div className="d-flex flex-column pt-4">
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
                                        {`${Math.ceil(distanceInMiles).toLocaleString()} mi`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            )
        );
    }
}
