export default function NewsTile(props) {
    const {url, title, subtitle, date} = props;
    return (
        <article className="tile is-child">
            <div className="position-relative">
                <figure className="image is-3by2">
                    <img className="rounded" src={url} />
                </figure>
                <div className="is-overlay p-3  d-flex flex-column justify-content-between">
                    <div>
                        <p className="title is-4 has-text-light is-size-6-mobile">{title}</p>
                        <p className="subtitle is-size-6 has-text-white">{subtitle}</p>
                    </div>
                    <p className="subtitle is-size-7 has-te has-text-light has-text-weight-bold">
                        {date}
                    </p>
                </div>
            </div>
        </article>
    );
}
