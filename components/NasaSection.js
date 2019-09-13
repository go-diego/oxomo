import React from "react";
import { to } from "await-to-js";
import format from "date-fns/format";
import startOfToday from "date-fns/start_of_today";
import { Base64 } from "js-base64";
import PostCard from "./PostCard/index";
import NeoTile from "./NeoTile";
import FeedCard from "./FeedCard";
import RoverTile from "./RoverTile";
import ErrorTile from "./ErrorTile";
import { APOD, NEO, Rovers } from "../api/nasa.api";
import { NasaFeed } from "../api/feeds.api";

const nasaApodApi = new APOD();
const nasaFeedApi = new NasaFeed();
const nasaNeoApi = new NEO();
const roversApi = new Rovers();

export default function NasaSection() {
    const [pictureOfTheDay, setPictureOfTheDay] = React.useState({});
    const [hasErrorApod, setHasErrorApod] = React.useState(false);
    const [
        isPictureOfTheDayLoading,
        setIsPictureOfTheDayLoading
    ] = React.useState(true);
    const [nasaNews, setNasaNews] = React.useState(null);
    const [isNasaNewsLoading, setIsNasaNewsLoading] = React.useState(true);
    const [isErrorNasaNews, setIsErrorNasaNews] = React.useState(false);
    const [nearEarthObject, setNearEarthObject] = React.useState(null);
    const [isNEOLoading, setIsNEOLoading] = React.useState(true);
    const [isErrorNEO, setIsErrorNEO] = React.useState(false);
    const [rovers, setRovers] = React.useState([]);
    const [isRoversLoading, setIsRoversLoading] = React.useState(true);
    const [isErrorRovers, setIsErrorRovers] = React.useState(false);

    React.useEffect(() => {
        async function getAstronomyPictureOfTheDay() {
            const [error, pictureOfTheDayResponse] = await to(
                nasaApodApi.get()
            );
            setIsPictureOfTheDayLoading(false);
            if (error) return setHasErrorApod(true);

            setPictureOfTheDay(pictureOfTheDayResponse);
            // console.log("pictureOfTheDayResponse", pictureOfTheDayResponse);
        }
        getAstronomyPictureOfTheDay();
    }, []);

    React.useEffect(() => {
        async function getNasaNews() {
            const [error, nasaNewsResponse] = await to(
                nasaFeedApi.getSolarSystemNews()
            );
            setIsNasaNewsLoading(false);
            if (error) return setIsErrorNasaNews(true);
            setNasaNews(nasaNewsResponse);
            //console.log("nasaNewsResponse", nasaNewsResponse);
        }
        getNasaNews();
    }, []);

    React.useEffect(() => {
        async function getNeo() {
            const [error, neoResponse] = await to(
                nasaNeoApi.getClosestApproachToday()
            );
            setIsNEOLoading(false);
            if (error) return setIsErrorNEO(true);
            setNearEarthObject(neoResponse);
            //console.log("neoResponse", neoResponse);
        }
        getNeo();
    }, []);

    React.useEffect(() => {
        async function getRovers() {
            const [error, roversResponse] = await to(roversApi.getAll());
            setIsRoversLoading(false);
            if (error) return setIsErrorRovers(true);
            const activeRovers = roversResponse.rovers.reduce((acc, rover) => {
                if (rover.status === "active") acc.push(rover.name);
                return acc;
            }, []);
            setRovers(activeRovers);
        }
        getRovers();
    }, []);

    return (
        <React.Fragment>
            {!hasErrorApod && (
                <div className="columns">
                    <div className="column">
                        <PostCard
                            link={`/apod?id=${Base64.encode(
                                format(startOfToday(), "YYYY-MM-DDTHH:mm:ss")
                            )}`}
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
                                fascinating universe is featured, along with a
                                brief explanation written by a professional
                                astronomer.{" "}
                            </p>
                        </PostCard>
                    </div>
                </div>
            )}
            <div className="columns">
                <div className="column">
                    {isErrorNasaNews && <ErrorTile />}
                    {!isErrorNasaNews && (
                        <FeedCard
                            isLoading={isNasaNewsLoading}
                            data={nasaNews}
                        />
                    )}
                </div>
                <div className="column">
                    {isErrorNasaNews && <ErrorTile />}
                    {!isErrorNasaNews && (
                        <FeedCard
                            isLoading={isNasaNewsLoading}
                            data={nasaNews}
                            index={1}
                        />
                    )}
                </div>
                <div className="column">
                    {isErrorRovers && <ErrorTile />}
                    {!isErrorRovers && (
                        <RoverTile
                            isLoading={isRoversLoading}
                            name={rovers[0]}
                        />
                    )}
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    {isErrorNEO && <ErrorTile />}
                    {!isErrorNEO && (
                        <NeoTile
                            isLoading={isNEOLoading}
                            data={nearEarthObject}
                        />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}
