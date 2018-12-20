import {Fragment} from "react";
import format from "date-fns/format";
import Youtube from "../utils/youtube";

export default function SpaceXLatestLaunchTile(props) {
    const {mission_name, launch_date_local, links, rocket, launch_site} = props;
    const youtubeUtils = new Youtube(links.video_link);
    const normalizedYoutubeVideUrl = youtubeUtils.normalizedUrl();

    return (
        <Fragment>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                    <figure className="image is-48x48">
                        <img className="is-rounded" src={links.mission_patch_small} />
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

            <p className="my-3">{`${rocket.rocket_name} from ${launch_site.site_name_long}`}</p>

            <div className="embed-responsive embed-responsive-4by3">
                <iframe
                    className="rounded embed-responsive-item"
                    src={normalizedYoutubeVideUrl}
                    allowFullScreen
                />
            </div>
        </Fragment>
    );
}
