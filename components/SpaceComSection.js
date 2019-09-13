import React from "react";
import { to } from "await-to-js";
import isToday from "date-fns/is_today";
import { SpaceComFeed } from "../api/feeds.api";
import FeedCard from "./FeedCard";

const spaceComFeedApi = SpaceComFeed();

export default function SpaceComSection() {
    const [data, setData] = React.useState(null);
    const [isLoading, setIsloading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            const [error, response] = await to(spaceComFeedApi.get());
            setIsloading(false);
            if (error) return setError(true);
            response.items = response.items.filter(item =>
                isToday(item.publication_date)
            );
            setData(response);
        }
        getData();
    }, []);

    return (
        !error && (
            <div className="columns is-multiline">
                {data &&
                    data.items.map((d, i) => {
                        return (
                            <div key={i} className="column is-one-third">
                                <FeedCard
                                    isLoading={isLoading}
                                    index={i}
                                    data={data}
                                />
                            </div>
                        );
                    })}
            </div>
        )
    );
}
