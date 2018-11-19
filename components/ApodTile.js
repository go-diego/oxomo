export default function ApodTile(props) {
    const {hdurl, title} = props;
    return (
        <div className="tile is-child is-paddingless box position-relative">
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
}
