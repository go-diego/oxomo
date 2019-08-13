import styled from "styled-components";
import Nav from "../components/Nav";
import { APOD } from "../api/nasa.api";

const nasaApodApi = new APOD();

// const img =
//     "https://apod.nasa.gov/apod/image/1908/PerseidsSlovakia_Horalek_1089.jpg";
// const title = "Perseid Meteors over Slovakia";
// const copyright = "Petr Horálek";

const Hero = styled.section`
    min-height: 50vh;
    ${"" /* background-color: #ffffff;
    background-image: url(${props => props.backgroundImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */}
`;

const AttributionWrapper = styled.div`
    display: flex;
    justify-content: end;
`;

const Attribution = styled.div`
    border-top-left-radius: 8px;
    text-align: right;
    padding: 5px;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.25);
`;

// const Box = styled.div`
//     margin-bottom: -2.5rem;
//     width: 75%;
//     z-index: 1;
// `;

export default function HomeHero() {
    const [pictureOfTheDay, setPictureOfTheDay] = React.useState({});

    React.useEffect(() => {
        async function getData() {
            const response = await nasaApodApi.get();
            console.log("IMAGE", pictureOfTheDay);
            setPictureOfTheDay(response);
        }
        getData();
    }, []);

    return (
        <Hero
            backgroundImage={pictureOfTheDay.hdurl || pictureOfTheDay.url}
            className="hero is-medium is-dark">
            <div className="hero-head">
                <Nav />
            </div>
            {/* <AttributionWrapper>
                <Attribution className="has-text-light">
                    <small>{pictureOfTheDay.title}</small>
                    <small>{pictureOfTheDay.copyright}</small>
                </Attribution>
            </AttributionWrapper> */}
        </Hero>
    );
}
