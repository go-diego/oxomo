import React from "react";
import { to } from "await-to-js";
import NeoTile from "./NeoTile";
import FeedCard from "./FeedCard";
import RoverTile from "./RoverTile";
import ErrorTile from "./ErrorTile";
import { APOD, NEO, Rovers } from "../api/nasa.api";
import { NasaFeed } from "../api/feeds.api";
import ApodCardContainer from "./ApodCardContainer";

const nasaFeedApi = new NasaFeed();
const nasaNeoApi = new NEO();
const roversApi = new Rovers();

export default function NasaSection() {
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
    <>
      <div className="columns">
        <div className="column">
          <ApodCardContainer />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          {isErrorNasaNews && <ErrorTile />}
          {!isErrorNasaNews && (
            <FeedCard isLoading={isNasaNewsLoading} data={nasaNews} />
          )}
        </div>
        <div className="column">
          {isErrorNasaNews && <ErrorTile />}
          {!isErrorNasaNews && (
            <FeedCard isLoading={isNasaNewsLoading} data={nasaNews} index={1} />
          )}
        </div>
        <div className="column">
          {isErrorRovers && <ErrorTile />}
          {!isErrorRovers && (
            <RoverTile isLoading={isRoversLoading} name={rovers[0]} />
          )}
        </div>
      </div>
      <div className="columns">
        <div className="column">
          {isErrorNEO && <ErrorTile />}
          {!isErrorNEO && (
            <NeoTile isLoading={isNEOLoading} data={nearEarthObject} />
          )}
        </div>
      </div>
    </>
  );
}
