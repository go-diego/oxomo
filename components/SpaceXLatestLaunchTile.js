import {Fragment} from "react";
import format from "date-fns/format";
import {YouTubeUrlNormalize} from "../utils/youtubeUrlNormalizer";

/**
 * TODO:
 * Get mission badge
 * Improve design
 * refactor utils
 */
export default function SpaceXLatestLaunchTile(props) {
    console.log("PROPS", props);
    const {mission_name, launch_date_local, links, rocket} = props;

    const normalizedYoutubeVideUrl = YouTubeUrlNormalize(links.video_link);

    return (
        <Fragment>
            <p className="title">Recent Launch</p>
            <p className="subtitle">{mission_name}</p>
            <p>{rocket.rocket_name}</p>
            <p>{format(new Date(launch_date_local), "ddd, MMM Do, YYYY")}</p>
            <div className="embed-responsive embed-responsive-16by9">
                <iframe
                    className="rounded embed-responsive-item"
                    src={normalizedYoutubeVideUrl}
                    allowFullScreen
                />
            </div>
        </Fragment>
    );
}
