import React from "react";
import ErrorTile from "./ErrorTile";

import {APOD} from "../api/nasa.api";

import to from "../utils/to";

const APODApi = new APOD();

export default class ApodTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = {...this.state};

        const apodPromise = APODApi.get();

        const [error, response] = await to(apodPromise);
        if (error) state.hasError = true;

        state.data = response;
        state.isLoading = false;

        this.setState({...state});
    }

    render() {
        let videoTile,
            pictureTile,
            hdurl,
            title,
            media_type,
            url = null;

        const {data, hasError, isLoading} = this.state;

        if (data) {
            ({hdurl, title, media_type, url} = data);
            pictureTile = (
                <div className="position-relative">
                    <figure className="image is-3by2">
                        <img className="rounded" src={hdurl} />
                    </figure>
                    <div className="is-overlay p-3">
                        <p className="subtitle has-text-white is-size-7-mobile">
                            Astronomy Picture of the Day
                        </p>
                        <p className="title has-text-light is-size-6-mobile">{title}</p>
                    </div>
                </div>
            );

            videoTile = (
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="rounded embed-responsive-item" src={url} allowFullScreen />
                </div>
            );
        }

        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child">
                    {(media_type === "video" && videoTile) || pictureTile}
                </article>
            )
        );
    }
}
