import React from "react";
import { to } from "await-to-js";
// import TileErrorBoundary from "./TileErrorBoundary";
import FeedCard from "./FeedCard";
import { MarsFeed } from "../api/feed.api";

const marsFeedApi = new MarsFeed();

export default function MarsSection() {
    const [marsNews, setMarsNews] = React.useState(null);
    const [isMarsNewsLoading, setIsMarsNewsLoading] = React.useState(true);
    const [curiosityNews, setCuriosityNews] = React.useState(null);
    const [isCuriosityNewsLoading, setIsCuriosityNewsLoading] = React.useState(
        true
    );
    const [scienceDailyNews, setScienceDailyNews] = React.useState(null);
    const [
        isScienceDailyNewsLoading,
        setIsScienceDailyNewsLoading
    ] = React.useState(true);

    React.useEffect(() => {
        async function getMarsNews() {
            const [error, marsNewsResponse] = await to(marsFeedApi.getNews());
            if (error) console.log("MARS NEWS ERROR", error);
            setMarsNews(marsNewsResponse);
            setIsMarsNewsLoading(false);
            //console.log("marsNewsResponse", marsNewsResponse);
        }
        getMarsNews();
    }, []);

    React.useEffect(() => {
        async function getCuriosityMissionUpdates() {
            const [error, curiosityNewsResponse] = await to(
                marsFeedApi.getCuriosityMissionUpdate()
            );
            if (error) console.log("CURIOSITY NEWS ERROR", error);
            setCuriosityNews(curiosityNewsResponse);
            setIsCuriosityNewsLoading(false);
            //console.log("curiosityNewsResponse", curiosityNewsResponse);
        }
        getCuriosityMissionUpdates();
    }, []);

    React.useEffect(() => {
        async function getScienceDailyMarsNews() {
            const [error, scienceDailyNewsResponse] = await to(
                marsFeedApi.getScienceDailyMarsNews()
            );
            if (error) console.log("SCIENCE DAILY NEWS ERROR", error);
            setScienceDailyNews(scienceDailyNewsResponse);
            setIsScienceDailyNewsLoading(false);
            //console.log("scienceDailyNewsResponse", scienceDailyNewsResponse);
        }
        getScienceDailyMarsNews();
    }, []);

    return (
        <div className="columns">
            <div className="column">
                <FeedCard isLoading={isMarsNewsLoading} data={marsNews} />
            </div>
            <div className="column">
                <FeedCard
                    isLoading={isCuriosityNewsLoading}
                    data={curiosityNews}
                />
            </div>
            <div className="column">
                <FeedCard
                    isLoading={isScienceDailyNewsLoading}
                    data={scienceDailyNews}
                />
            </div>
        </div>
    );
}
