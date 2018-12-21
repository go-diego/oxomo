import React from "react";
import ErrorTile from "./ErrorTile";

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

        state.data = response;
        state.isLoading = false;

        this.setState({...state});
    }

    //console.log("MARS NEWS PROPS", props);
    render() {
        let feedTitle,
            items,
            newsTitle,
            mostRecentEntry,
            imageUrl = null;

        const {data, isLoading, hasError} = this.state;

        if (data) {
            ({title: feedTitle, items} = data);
            mostRecentEntry = items[0];
            ({title: newsTitle} = mostRecentEntry);
            imageUrl = mostRecentEntry["media:content"]["$"].url;
        }

        return (
            (hasError && <ErrorTile />) || (
                <article className="tile is-child">
                    <div className="position-relative">
                        <figure className="image is-3by2">
                            <img className="rounded" src={imageUrl} />
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
