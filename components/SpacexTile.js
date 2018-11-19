import {Fragment} from "react";
import format from "date-fns/format";

export default function SpacexFile(props) {
    const {launches} = props;
    return (
        <Fragment>
            <p className="title is-size-4 is-size-4-mobile">SpaceX</p>
            <div className="level is-mobile">
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
            </div>
            <div className="level is-mobile">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="heading">Next Launch</p>
                        <p className="title is-size-6 has-text-weight-semibold">
                            {format(new Date(launches.next.launch_date_local), "MMM D, YYYY")}
                        </p>
                        <p className="is-size-6 has-text-weight-semibold">
                            {launches.next.site.location.name}
                        </p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
