import React from "react";
import ErrorTile from "./ErrorTile";
import format from "date-fns/format";

import {NasaFeed} from "../api/feed.api";

import to from "../utils/to";

const NasaFeedApi = new NasaFeed();

/**
 * TODO:
 * add date
 */
export default class NasaNewsTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = {...this.state};

        const nasaNewsPromise = NasaFeedApi.getSolarSystemNews();

        const [error, response] = await to(nasaNewsPromise);
        if (error) state.hasError = true;

        state.data = response;
        state.isLoading = false;

        this.setState({...state});
    }

    render() {
        let feedTitle,
            newsTitle,
            imageUrl,
            pubdate,
            enclosures,
            publishDate = null;

        const {data, isLoading, hasError} = this.state;

        if (data) {
            ({
                pubdate,
                title: newsTitle,
                enclosures,
                meta: {
                    image: {title: feedTitle}
                }
            } = data[0]);

            imageUrl = enclosures[0].url;
            publishDate = format(new Date(pubdate), "ddd, MMM Do");
        }

        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child">
                    <div className="position-relative">
                        <figure className="image is-3by2">
                            <img className="rounded" src={imageUrl} />
                        </figure>
                        <div className="is-overlay p-3  d-flex flex-column justify-content-between">
                            <p className="title is-4 has-text-light is-size-6-mobile">
                                {newsTitle}
                            </p>
                            <p className="subtitle is-size-6 has-text-white">{publishDate}</p>
                        </div>
                    </div>
                </article>
            )
        );
    }
}
