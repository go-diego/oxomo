/**
 * TODO:
 * Take lastBuildDate and make it local
 */
export default function MarsNewsTile(props) {
    console.log("MARS NEWS PROPS", props);
    const {title: feedTitle, items} = props;
    const mostRecentEntry = items[0];
    const {title: newsTitle} = mostRecentEntry;
    const url = mostRecentEntry["media:content"][0]["$"].url;
    return (
        <div className="position-relative">
            <figure className="image is-3by2">
                <img className="rounded" src={url} />
            </figure>
            <div className="is-overlay p-3  d-flex flex-column justify-content-between">
                <p className="title has-text-light is-size-6-mobile">{feedTitle}</p>
                <p className="subtitle has-text-white is-size-7-mobile">{newsTitle}</p>
            </div>
        </div>
    );
}
