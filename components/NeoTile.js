import {Fragment} from "react";

export default function NeoTile(props) {
    const {today, stats} = props;
    return (
        <Fragment>
            <p className="title is-size-4 is-size-6-mobile">Near Earth Objects</p>
            <div className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Today</p>
                        <p className="title">{today.element_count.toLocaleString()}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">All Time</p>
                        <p className="title">{stats.near_earth_object_count.toLocaleString()}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Close Approaches</p>
                        {/* <p className="is-size-7 has-text-dark">As of Today</p> */}
                        <p className="title">{stats.close_approach_count.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
