import {Fragment} from "react";
import format from "date-fns/format";

export default function SpacexFile(props) {
    const {launches} = props;
    return (
        <Fragment>
            <p className="title is-size-4 is-size-4-mobile">SpaceX</p>
            <p className="subtitle is-6 mb-0">Next Launch</p>
            <p className="subtitle is-size-7">from {launches.next.site.location.name}</p>
            <div className="d-flex flex-column pt-4">
                <div className="level is-mobile">
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading mb-1">Mission</p>
                            <p className="is-size-6 has-text-weight-semibold">
                                {launches.next.mission_name}
                            </p>
                        </div>
                    </div>
                    <div className="level-item has-text-centered">
                        <div>
                            <p className="heading mb-1">Date</p>
                            <p className="title is-size-6 has-text-weight-semibold">
                                {format(new Date(launches.next.launch_date_local), "MMM D, YYYY")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
