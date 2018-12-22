import React from "react";
import ErrorTile from "./ErrorTile";
import format from "date-fns/format";

import {MarsFeed} from "../api/feed.api";

import to from "../utils/to";

const MarsFeedApi = new MarsFeed();

/**
 * TODO:
 * Take lastBuildDate and make it local
 */
export default class MarsNewsTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = {...this.state};

        const marsNewsPromise = MarsFeedApi.getNews();

        const [error, response] = await to(marsNewsPromise);
        if (error) state.hasError = true;

        console.log("RESPONSE", response);

        state.data = response;
        state.isLoading = false;

        this.setState({...state});
    }

    render() {
        let feedTitle,
            newsTitle,
            imageUrl,
            pubdate,
            publishDate = null;

        const {data, isLoading, hasError} = this.state;

        if (data) {
            ({
                pubdate,
                title: newsTitle,
                image: {url: imageUrl},
                meta: {
                    image: {title: feedTitle}
                }
            } = data[0]);

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
