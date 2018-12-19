export default function ApodTile(props) {
    const {hdurl, title, media_type, url} = props;
    console.log("hdurl", hdurl);
    console.log("url", url);
    const pictureTile = (
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

    const videoTile = (
        <div className="embed-responsive embed-responsive-16by9">
            <iframe className="rounded embed-responsive-item" src={url} allowFullScreen />
        </div>
    );

    return (media_type === "video" && videoTile) || pictureTile;
}
