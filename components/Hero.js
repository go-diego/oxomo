import styled from "styled-components";
import Nav from "../components/Nav";

const img =
    "https://apod.nasa.gov/apod/image/1908/PerseidsSlovakia_Horalek_1089.jpg";
// const title = "Perseid Meteors over Slovakia";
// const copyright = "Petr Horálek";

const Hero = styled.section`
    background-color: #ffffff;
    background-image: url(${props => props.backgroundImage}) !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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

const Body = styled.div`
    padding-top: 2.5rem;
    padding-bottom: 6rem;
`;

export default function HomeHero() {
    return (
        <Hero
            backgroundImage={img}
            // backgroundImage={pictureOfTheDay.hdurl || pictureOfTheDay.url}
            className="hero is-medium is-dark is-bold">
            <div className="hero-head">
                <Nav />
            </div>
            {/* <AttributionWrapper>
                <Attribution className="has-text-light">
                    <small>{pictureOfTheDay.title}</small>
                    <small>{pictureOfTheDay.copyright}</small>
                </Attribution>
            </AttributionWrapper> */}
            <Body className="hero-body">
                <div className="container">
                    <h1 className="title is-1 is-family-secondary has-text-centered">
                        OXOMO
                    </h1>
                </div>
            </Body>
        </Hero>
    );
}
