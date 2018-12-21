import React from "react";
import ErrorTile from "./ErrorTile";

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
            items,
            mostRecentEntry,
            newsTitle,
            url = null;

        const {data, isLoading, hasError} = this.state;

        if (data) {
            ({title: feedTitle, items} = data);
            mostRecentEntry = items[0];
            ({
                title: newsTitle,
                enclosure: {url}
            } = mostRecentEntry);
        }

        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child">
                    <div className="position-relative">
                        <figure className="image is-3by2">
                            <img className="rounded" src={url} />
                        </figure>
                        <div className="is-overlay p-3  d-flex flex-column justify-content-between">
                            <p className="title has-text-light is-size-6-mobile">{feedTitle}</p>
                            <p className="subtitle has-text-white is-size-7-mobile">{newsTitle}</p>
                        </div>
                    </div>
                </article>
            )
        );
    }
}
