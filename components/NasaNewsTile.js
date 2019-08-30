import React from "react";
import ErrorTile from "./ErrorTile";
import NewsTitle from "./NewsTile";
import format from "date-fns/format";

import { NasaFeed } from "../api/feeds.api";

import to from "../utils/to";

const NasaFeedApi = new NasaFeed();

export default class NasaNewsTile extends React.Component {
    state = {
        data: null,
        isLoading: true,
        hasError: false
    };

    async componentDidMount() {
        let state = { ...this.state };

        const nasaNewsPromise = NasaFeedApi.getSolarSystemNews();

        const [error, response] = await to(nasaNewsPromise);
        if (error) state.hasError = true;

        state.data = response;
        state.isLoading = false;

        this.setState({ ...state });
    }

    render() {
        let feedTitle,
            newsTitle,
            imageUrl,
            pubdate,
            enclosures,
            publishDate = null;

        const { data, isLoading, hasError } = this.state;

        if (data) {
            ({
                pubdate,
                title: newsTitle,
                enclosures,
                meta: { title: feedTitle }
            } = data[0]);

            imageUrl = enclosures[0].url;
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
