import React from "react";
import ErrorTile from "./ErrorTile";
import to from "../utils/to";
import format from "date-fns/format";
import Youtube from "../utils/youtube";

import SpaceX from "../api/spacex.api";
const SpacexApi = new SpaceX();

export default class SpaceXLatestLaunchTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = {...this.state};

        const latestLaunchPromise = SpacexApi.getLatestLaunch();

        const [error, response] = await to(latestLaunchPromise);
        if (error) state.hasError = true;

        state.data = response;
        state.isLoading = false;

        this.setState({...state});
    }

    render() {
        let mission_name,
            launch_date_local,
            links,
            rocket,
            launch_site,
            youtubeUtils,
            normalizedYoutubeVideUrl,
            missionPatch,
            launchSiteName,
            rocketName = null;

        const {data, isLoading, hasError} = this.state;

        if (data) {
            ({mission_name, launch_date_local, links, rocket, launch_site} = data);
            youtubeUtils = new Youtube(links.video_link);
            normalizedYoutubeVideUrl = youtubeUtils.normalizedUrl();
            missionPatch = links.mission_patch_small;
            launchSiteName = launch_site.site_name_long;
            rocketName = rocket.rocket_name;
        }

        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child notification is-info">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <figure className="image is-48x48">
                                <img className="is-rounded" src={missionPatch} />
                            </figure>
                            <h2 className="title is-size-6-mobile">{mission_name}</h2>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <p className="subtitle is-size-7 is-uppercase is-marginless is-size-7-mobile">
                                Recent Launch
                            </p>
                            <p className="is-size-7-mobile">
                                {format(new Date(launch_date_local), "ddd, MMM Do, YYYY")}
                            </p>
                        </div>
                    </div>

                    <p className="my-3">{`${rocketName} from ${launchSiteName}`}</p>

                    <div className="embed-responsive embed-responsive-4by3">
                        <iframe
                            className="rounded embed-responsive-item"
                            src={normalizedYoutubeVideUrl}
                            allowFullScreen
                        />
                    </div>
                </article>
            )
        );
    }
}
