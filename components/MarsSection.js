import React from "react";
import { to } from "await-to-js";
import NasaNewsCard from "./NasaNewsCard";
import { MarsFeed } from "../api/feed.api";

const marsFeedApi = new MarsFeed();

// import TileErrorBoundary from "./TileErrorBoundary";
// import MarsNewsTile from "../components/MarsNewsTile"; //delete
// import CuriosityMissionTile from "../components/CuriosityMissionTile"; //delete
// import ScienceDailyMarsNews from "../components/ScienceDailyMarsNews"; //delete
// import MarsImage from "../images/mars-landscape.jpg";

export default function MarsSection() {
    const [marsNews, setMarsNews] = React.useState([]);
    const [isMarsNewsLoading, setIsMarsNewsLoading] = React.useState(true);
    const [curiosityNews, setCuriosityNews] = React.useState([]);
    const [isCuriosityNewsLoading, setIsCuriosityNewsLoading] = React.useState(
        true
    );
    const [scienceDailyNews, setScienceDailyNews] = React.useState([]);
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
        <React.Fragment>
            <div className="columns">
                <div className="column">
                    <NasaNewsCard
                        isLoading={isMarsNewsLoading}
                        data={marsNews[0]}
                    />
                </div>
                <div className="column">
                    <NasaNewsCard
                        isLoading={isCuriosityNewsLoading}
                        data={curiosityNews[0]}
                    />
                </div>
                <div className="column">
                    <NasaNewsCard
                        isLoading={isScienceDailyNewsLoading}
                        data={scienceDailyNews[0]}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
