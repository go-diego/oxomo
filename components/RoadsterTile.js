import React from "react";
import ErrorTile from "./ErrorTile";
import RoadsterImage from "../images/roadster.svg";
import to from "../utils/to";

import SpaceX from "../api/spacex.api";
const SpacexApi = new SpaceX();

export default class RoadsterTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = {...this.state};

        const roadsterPromise = SpacexApi.getRoadsterData();

        const [error, response] = await to(roadsterPromise);
        if (error) state.hasError = true;

        state.data = response;
        state.isLoading = false;

        this.setState({...state});
    }

    render() {
        let earth_distance_mi,
            distanceFromEarthInMiles = null;

        const {data, isLoading, hasError} = this.state;

        if (data) {
            ({earth_distance_mi} = data);
            distanceFromEarthInMiles = Math.floor(earth_distance_mi).toLocaleString();
        }

        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child p-2 notification has-background-dark">
                    <div className="position-relative h-100">
                        <figure className="image is-3by2">
                            <img className="rounded" src={RoadsterImage} />
                        </figure>
                        <div className="is-overlay p-3 d-flex flex-column justify-content-between">
                            <p className="subtitle has-text-light is-size-6-mobile">
                                Where in the solar system is Musk's Roadster?
                            </p>
                            <div>
                                <h3 className="title has-text-white">{distanceFromEarthInMiles}</h3>
                                <h6 className="subtitle is-uppercase has-text-white">
                                    Miles From Earth
                                </h6>
                            </div>
                        </div>
                    </div>
                </article>
            )
        );
    }
}
