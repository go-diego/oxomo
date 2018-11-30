import React from "react";
import {Rovers} from "../api/nasa.api";
const RoversApi = new Rovers();

export default class RoverTile extends React.Component {
    state = {
        latestPhoto: [],
        manifest: {}
    };

    async componentDidMount() {
        const {name} = this.props;
        const manifestResponse = await RoversApi.getManifest(name);
        const navcamPictures = manifestResponse.photo_manifest.photos.filter(photo =>
            photo.cameras.includes("FHAZ")
        );
        const sol = navcamPictures[navcamPictures.length - 1].sol;
        const photosResponse = await RoversApi.getPhotos(name, sol, "fhaz");
        this.setState({
            latestPhoto:
                photosResponse.photos[Math.floor(Math.random() * photosResponse.photos.length)],
            manifest: manifestResponse.photo_manifest
        });
    }

    render() {
        const {name} = this.props;
        const {latestPhoto, manifest} = this.state;

        return (
            <div className="position-relative">
                <figure className="image is-3by2">
                    {latestPhoto && (
                        <img alt={latestPhoto.id} className="rounded" src={latestPhoto.img_src} />
                    )}
                </figure>
                <div className="is-overlay p-3">
                    <p className="title has-text-white is-size-5-mobile">{name}</p>
                    {manifest && (
                        <p className="subtitle has-text-light is-uppercase is-size-7-mobile">
                            {manifest.status}
                        </p>
                    )}
                </div>
            </div>
        );
    }
}
