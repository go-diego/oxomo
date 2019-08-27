import React from "react";
import { to } from "await-to-js";
import format from "date-fns/format";
import NewsCard from "./NewsCard";
import { Rovers } from "../api/nasa.api";

const RoversApi = new Rovers();

export default function RoverTile({ isLoading, name }) {
    const [manifest, setManifest] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);
    const [isDataLoading, setIsDataLoading] = React.useState(true);

    React.useEffect(() => {
        if (name) {
            async function getData() {
                const [error, manifestResponse] = await to(
                    RoversApi.getManifest(name)
                );
                if (error) console.log("ROVER ERROR", error);
                setManifest(manifestResponse.photo_manifest);
                const navcamPictures = manifestResponse.photo_manifest.photos.filter(
                    photo => photo.cameras.includes("FHAZ")
                );
                const sol = navcamPictures[navcamPictures.length - 1].sol;
                const [photoError, photosResponse] = await to(
                    RoversApi.getPhotos(name, sol, "fhaz")
                );
                if (photoError) console.log("ROVER ERROR", error);
                setPhoto(
                    photosResponse.photos[
                        Math.floor(Math.random() * photosResponse.photos.length)
                    ]
                );
            }
            getData();
        }
    }, [name]);

    React.useEffect(() => {
        if (manifest && photo) setIsDataLoading(false);
    }, [manifest, photo]);

    return (
        <NewsCard
            isTargetBlank
            isLoading={isLoading && isDataLoading}
            title={name}
            subtitle={`From ${
                photo && photo.camera ? photo.camera.full_name : ""
            }`}
            alt="Latest from Curiosity"
            src={photo && photo.img_src}
            // link={photo.link}
            description={
                photo && format(new Date(photo.earth_date), "ddd, MMM Do")
            }
        />
    );
}
