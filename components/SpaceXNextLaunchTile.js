import {Fragment} from "react";
import format from "date-fns/format";

export default function SpaceXNextLaunchTile(props) {
    const {launches} = props;
    const {next: nextLaunch} = launches;
    const {links, rocket, site, mission_name, launch_date_local} = nextLaunch;
    const {mission_patch_small, article_link, wikipedia} = links;
    return (
        <Fragment>
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
                        <p className="title is-display-2">
                            {format(new Date(launch_date_local), "DD")}
                        </p>
                    </div>
                </div>
            </div>
            <p className="has-text-centered">{`${rocket.rocket_name} from ${
                site.location.name
            }`}</p>
        </Fragment>
    );
}
