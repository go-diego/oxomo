import format from "date-fns/format";
import styled from "styled-components";
import PostCard from "./PostCard/index";
import Youtube from "../utils/youtube";

const MissionTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
`;

const MissionPatch = styled.figure`
    margin-left: 0 !important;
    margin-right: 0.25rem !important;
`;

export default function SpaceXLatestLaunchTile({ isLoading, data }) {
    let mission_name,
        launch_date_local,
        links,
        rocket,
        launch_site,
        youtubeUtils,
        normalizedYoutubeVideUrl,
        missionPatch,
        launchSiteName,
        details,
        rocketName = null;

    if (data) {
        ({
            mission_name,
            launch_date_local,
            links,
            rocket,
            launch_site,
            details
        } = data);
        youtubeUtils = new Youtube(links.video_link);
        normalizedYoutubeVideUrl = youtubeUtils.normalizedUrl();
        missionPatch = links.mission_patch_small;
        launchSiteName = launch_site.site_name_long;
        rocketName = rocket.rocket_name;
    }

    return (
        <PostCard
            mediaType="video"
            isLoading={isLoading}
            src={`${normalizedYoutubeVideUrl}?rel=0`}
            title="Latest Launch"
            subtitle={format(new Date(launch_date_local), "ddd, MMM Do, YYYY")}>
            <div className="content">
                <MissionTitle>
                    <MissionPatch className="image is-48x48">
                        <img className="is-rounded" src={missionPatch} />
                    </MissionPatch>
                    <h2 className="title is-marginless is-size-6-mobile">
                        {mission_name}
                    </h2>
                </MissionTitle>
                <p>{`Blast off from ${launchSiteName} aboard a ${rocketName}`}</p>
                <p>{details}</p>
            </div>
        </PostCard>
    );
}
