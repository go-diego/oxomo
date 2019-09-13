import React from "react";
import to from "await-to-js";
import ErrorTile from "./ErrorTile";
import FeedCard from "./FeedCard";
import { PhysOrgFeed } from "../api/feeds.api";

const physOrgFeedApi = new PhysOrgFeed();

export default function PhysOrgNews({ type }) {
    const [feedData, setFeedData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        if (type) {
            async function getData() {
                let action;
                switch (type) {
                    case "space-exploration":
                        action = physOrgFeedApi.getSpaceExplorationNews;
                        break;
                    case "astronomy":
                        action = physOrgFeedApi.getAstronomyNews;
                        break;
                    case "astrobiology":
                        action = physOrgFeedApi.getAstrobiologyNews;
                        break;
                }
                const [error, response] = await to(action(true));
                setIsLoading(false);
                if (error) return setIsError(true);

                response.items = response.items.map(item => {
                    return {
                        ...item,
                        media_thumbnail: {
                            url: item.media_thumbnail.url.replace("tmb", "500")
                        }
                    };
                });

                setFeedData(response);
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
