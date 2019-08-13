// import TileErrorBoundary from "./TileErrorBoundary";
// import ApodTile from "./ApodTile";
// import NeoTile from "./NeoTile";
// import NasaNewsTile from "./NasaNewsTile";
import PostCard from "./PostCard";

import { APOD } from "../api/nasa.api";

const nasaApodApi = new APOD();

export default function NasaSection() {
    const [pictureOfTheDay, setPictureOfTheDay] = React.useState({});

    React.useEffect(() => {
        async function getData() {
            const response = await nasaApodApi.get();
            console.log("IMAGE", response);
            setPictureOfTheDay(response);
        }
        getData();
    }, []);

    return (
        <div className="columns">
            <div className="column">
                <PostCard
                    alt={pictureOfTheDay.title}
                    src={pictureOfTheDay.hdurl || pictureOfTheDay.url}
                    title={pictureOfTheDay.title}
                    subtitle={pictureOfTheDay.copyright}
                    description={pictureOfTheDay.explanation}
                />
            </div>
        </div>
        // <section className="section">
        //     <div className="container">
        //         <h1 className="title">NASA News</h1>
        //         <div className="tile is-ancestor">
        //             <div className="tile is-vertical is-8">
        //                 <div className="tile is-parent">
        //                     <TileErrorBoundary>
        //                         <ApodTile />
        //                     </TileErrorBoundary>
        //                 </div>
        //             </div>
        //             <div className="tile is-parent is-vertical">
        //                 <TileErrorBoundary>
        //                     <NasaNewsTile />
        //                 </TileErrorBoundary>
        //                 <TileErrorBoundary>
        //                     <NeoTile />
        //                 </TileErrorBoundary>
        //             </div>
        //         </div>
        //     </div>
        // </section>
    );
}
