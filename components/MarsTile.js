import {Fragment} from "react";
import format from "date-fns/format";

export default function MarsTile(props) {
    const {sol, rovers} = props;
    return (
        <Fragment>
            <p className="title is-size-4">Mars</p>
            <p className="subtitle">{format(sol.terrestrial_date, "ddd, MMM. DD")}</p>
            <div className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">Sunrise</p>
                        <p className="title is-size-4-mobile">{sol.sunrise}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">High</p>
                        <p className="title is-size-4-mobile">{sol.max_temp.toLocaleString()}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">Low</p>
                        {/* <p className="is-size-7 has-text-dark">As of Today</p> */}
                        <p className="title is-size-4-mobile">{sol.min_temp.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">Sunset</p>
                        <p className="title">{sol.sunset}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">High (ground)</p>
                        <p className="title">{sol.max_gts_temp}</p>
                    </div>
                </div>
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading mb-1">Low (ground)</p>
                        <p className="title">{sol.min_gts_temp}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
