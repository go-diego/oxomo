import React from "react";
import to from "await-to-js";
import ErrorTile from "./ErrorTile";
import FeedCard from "./FeedCard";
import { MarsFeed } from "../api/feeds.api";

const marsFeedApi = new MarsFeed();

export default function MarsNewsCard({ type }) {
    const [feedData, setFeedData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        if (type) {
            async function getData() {
                let action;
                switch (type) {
                    case "curiosity":
                        action = marsFeedApi.getCuriosityMissionUpdate;
                        break;
                    case "science-daily":
                        action = marsFeedApi.getScienceDailyMarsNews;
                        break;
                    case "mars-news":
                        action = marsFeedApi.getNews;
                        break;
                }
                const [error, response] = await to(action(true));
                console.log("ERROR", error);
                if (error) setIsError(true);

                setFeedData(response);
                setIsLoading(false);
            }
            getData();
        }
    }, []);

    return (
        (isError && <ErrorTile />) || (
            <FeedCard isLoading={isLoading} data={feedData} />
        )
    );
}
