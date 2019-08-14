// import TileErrorBoundary from "./TileErrorBoundary";
import React from "react";
import { to } from "await-to-js";
import PostCard from "./PostCard";
import NeoTile from "./NeoTile";
import NasaNewsCard from "./NasaNewsCard";
import { APOD, NEO } from "../api/nasa.api";
import { NasaFeed } from "../api/feed.api";

const nasaApodApi = new APOD();
const nasaFeedApi = new NasaFeed();
const nasaNeoApi = new NEO();

export default function NasaSection() {
    const [pictureOfTheDay, setPictureOfTheDay] = React.useState({});
    const [
        isPictureOfTheDayLoading,
        setIsPictureOfTheDayLoading
    ] = React.useState(true);
    const [nasaNews, setNasaNews] = React.useState([]);
    const [isNasaNewsLoading, setIsNasaNewsLoading] = React.useState(true);
    const [nearEarthObject, setNearEarthObject] = React.useState(null);
    const [isNEOLoading, setIsNEOLoading] = React.useState(true);

    React.useEffect(() => {
        async function getAstronomyPictureOfTheDay() {
            const [error, pictureOfTheDayResponse] = await to(
                nasaApodApi.get()
            );
            if (error) console.log("APOD ERROR", error);
            setPictureOfTheDay(pictureOfTheDayResponse);
            setIsPictureOfTheDayLoading(false);
            console.log("pictureOfTheDayResponse", pictureOfTheDayResponse);
        }
        getAstronomyPictureOfTheDay();
    }, []);

    React.useEffect(() => {
        async function getNasaNews() {
            const [error, nasaNewsResponse] = await to(
                nasaFeedApi.getSolarSystemNews()
            );
            if (error) console.log("NASA NEWS ERROR", error);
            setNasaNews(nasaNewsResponse);
            setIsNasaNewsLoading(false);
            console.log("nasaNewsResponse", nasaNewsResponse);
        }
        getNasaNews();
    }, []);

    React.useEffect(() => {
        async function getNeo() {
            const [error, neoResponse] = await to(
                nasaNeoApi.getClosestApproachToday()
            );
            if (error) console.log("NEOS ERROR", error);
            setNearEarthObject(neoResponse);
            setIsNEOLoading(false);
            console.log("neoResponse", neoResponse);
        }
        getNeo();
    }, []);

    // TODO: handle when media type is video
    return (
        <React.Fragment>
            <div className="columns">
                <div className="column">
                    <PostCard
                        isLoading={isPictureOfTheDayLoading}
                        alt={pictureOfTheDay.title}
                        src={pictureOfTheDay.hdurl || pictureOfTheDay.url}
                        title={pictureOfTheDay.title}
                        subtitle="Astronomy Picture of the Day"
                        // description={pictureOfTheDay.explanation}
                        // description={
                        //     pictureOfTheDay.copyrights
                        //         ? `by ${pictureOfTheDay.copyrights}`
                        //         : null
                        // }
                    />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <NasaNewsCard
                        isLoading={isNasaNewsLoading}
                        data={nasaNews[0]}
                    />
                </div>
                <div className="column">
                    <NasaNewsCard
                        isLoading={isNasaNewsLoading}
                        data={nasaNews[1]}
                    />
                </div>
                <div className="column">
                    <NasaNewsCard
                        isLoading={isNasaNewsLoading}
                        data={nasaNews[2]}
                    />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <NeoTile isLoading={isNEOLoading} data={nearEarthObject} />
                    {/* <PostCard
                        isReversed
                        src="https://www.jpl.nasa.gov/images/asteroid/20180723/main-animation-16.gif"
                        isLoading={isNEOLoading}
                        alt="Near Earth Objects"
                        title="Near Earth Objects"
                        subtitle="Closest Approach Today"
                        description={nearEarthObject.name}
                    /> */}
                </div>
            </div>
        </React.Fragment>
    );
}
