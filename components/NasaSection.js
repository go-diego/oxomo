// import TileErrorBoundary from "./TileErrorBoundary";
import React from "react";
import { to } from "await-to-js";
import PostCard from "./PostCard";
import NeoTile from "./NeoTile";
import NasaNewsCard from "./NasaNewsCard";
import RoverTile from "./RoverTile";
import { APOD, NEO, Rovers } from "../api/nasa.api";
import { NasaFeed } from "../api/feed.api";

const nasaApodApi = new APOD();
const nasaFeedApi = new NasaFeed();
const nasaNeoApi = new NEO();
const roversApi = new Rovers();

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
    const [rovers, setRovers] = React.useState([]);
    const [isRoversLoading, setIsRoversLoading] = React.useState(true);

    React.useEffect(() => {
        async function getAstronomyPictureOfTheDay() {
            const [error, pictureOfTheDayResponse] = await to(
                nasaApodApi.get()
            );
            if (error) console.log("APOD ERROR", error);
            setPictureOfTheDay(pictureOfTheDayResponse);
            setIsPictureOfTheDayLoading(false);
            // console.log("pictureOfTheDayResponse", pictureOfTheDayResponse);
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
            //console.log("nasaNewsResponse", nasaNewsResponse);
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
            //console.log("neoResponse", neoResponse);
        }
        getNeo();
    }, []);

    React.useEffect(() => {
        async function getRovers() {
            const [error, roversResponse] = await to(roversApi.getAll());
            if (error) console.log("ROVERS ERROR", error);
            const activeRovers = roversResponse.rovers.reduce((acc, rover) => {
                if (rover.status === "active") acc.push(rover.name);
                return acc;
            }, []);
            setIsRoversLoading(false);
            setRovers(activeRovers);
        }
        getRovers();
    }, []);

    return (
        <React.Fragment>
            <div className="columns">
                <div className="column">
                    <PostCard
                        mediaType={pictureOfTheDay.media_type}
                        isLoading={isPictureOfTheDayLoading}
                        alt={pictureOfTheDay.title}
                        src={pictureOfTheDay.hdurl || pictureOfTheDay.url}
                        title={pictureOfTheDay.title}
                        subtitle="Astronomy Picture of the Day">
                        {pictureOfTheDay.copyright && (
                            <p className="content">
                                by {pictureOfTheDay.copyright}
                            </p>
                        )}
                        <p>
                            Each day a different image or photograph of our
                            fascinating universe is featured, along with a brief
                            explanation written by a professional astronomer.{" "}
                        </p>
                    </PostCard>
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
                    <RoverTile isLoading={isRoversLoading} name={rovers[0]} />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    <NeoTile isLoading={isNEOLoading} data={nearEarthObject} />
                </div>
            </div>
        </React.Fragment>
    );
}
