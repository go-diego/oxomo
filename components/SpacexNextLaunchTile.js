import React from "react";
import ErrorTile from "./ErrorTile";
import to from "../utils/to";
import format from "date-fns/format";
import compareAsc from "date-fns/compare_asc";

import SpaceX from "../api/spacex.api";
const SpacexApi = new SpaceX();

export default class SpaceXNextLaunchTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = {...this.state};

        const latestLaunchPromise = SpacexApi.getUpcomingLaunches();

        const [error, response] = await to(latestLaunchPromise);
        if (error) state.hasError = true;

        state.data = response.filter(
            launch => compareAsc(new Date(launch.launch_date_local), new Date()) > 0
        )[0];
        state.isLoading = false;

        this.setState({...state});
    }

    render() {
        let links,
            rocket,
            launch_site,
            mission_name,
            launch_date_local,
            mission_patch_small,
            rocketName,
            siteLocationName,
            article_link,
            wikipedia = null;

        const {data, isLoading, hasError} = this.state;
        if (data) {
            ({links, launch_site, rocket, mission_name, launch_date_local} = data);
            ({mission_patch_small, article_link, wikipedia} = links);
            rocketName = rocket.rocket_name;
            siteLocationName = launch_site.site_name_long;
        }

        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child notification is-danger">
                    <div className="d-flex flex-column justify-content-between">
                        <div className="d-flex flex-column justify-content-between">
                            <p className="subtitle is-size-7 is-uppercase is-marginless is-size-7-mobile">
                                Next Launch
                            </p>
                        </div>
                        <div className="d-flex align-items-center py-3">
                            <figure className="image is-48x48">
                                <img className="is-rounded" src={mission_patch_small} />
                            </figure>
                            <h2 className="title">{mission_name}</h2>
                        </div>
                    </div>

                    <div className="level is-mobile  is-marginless">
                        <div className="level-item has-text-centered">
                            <div>
                                <p className="heading is-marginless is-size-3">
                                    {format(new Date(launch_date_local), "ddd")}
                                </p>
                                <p className="heading is-marginless is-size-6">
                                    {format(new Date(launch_date_local), "MMMM")}
                                </p>
                                <p className="title is-display-1">
                                    {format(new Date(launch_date_local), "DD")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="has-text-centered">{`${rocketName} from ${siteLocationName}`}</p>
                </article>
            )
        );
    }
}
