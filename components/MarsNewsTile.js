import React from "react";
import ErrorTile from "./ErrorTile";
import NewsTitle from "./NewsTile";
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
                <NewsTitle
                    title={feedTitle}
                    subtitle={newsTitle}
                    url={imageUrl}
                    date={publishDate}
                />
            )
        );
    }
}
