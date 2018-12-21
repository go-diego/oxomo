import MainLayout from "../containers/MainLayout";

export default function Spacex() {
    return (
        <MainLayout>
            <section className="section container">
                {/* <div className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Launches</p>
                        <p className="title">{launches.count.toLocaleString()}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Success</p>
                        <p className="title">{launches.success_count.toLocaleString()}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Failed</p>
                        <p className="title">{launches.failure_count.toLocaleString()}</p>
                    </div>
                </div>
            </div> */}
            </section>
        </MainLayout>
    );
}

// spacexData.launches = {};
// const spacexLaunches = await SpaceXApi.getPastLaunches();
// spacexData.launches.count = spacexLaunches.length;
// spacexData.launches.success_count = spacexLaunches.filter(
//     launch => launch.launch_success
// ).length;
// spacexData.launches.failure_count = spacexLaunches.filter(
//     launch => !launch.launch_success
// ).length;
// const spacexUpcomingLaunches = await SpaceXApi.getUpcomingLaunches();
// spacexData.launches.next = spacexUpcomingLaunches.filter(
//     launch => compareAsc(new Date(launch.launch_date_local), new Date()) > 0
// )[0];
// spacexData.launches.next.site = await SpaceXApi.getLaunchPadById(
//     spacexData.launches.next.launch_site.site_id
// );
//spacexData.roadster = await SpaceXApi.getRoadsterData();
//spacexData.launches.latest = await SpaceXApi.getLatestLaunch();
