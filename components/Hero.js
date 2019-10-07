import styled from "styled-components";
import Nav from "../components/Nav";

const img =
    "https://apod.nasa.gov/apod/image/1908/PerseidsSlovakia_Horalek_1089.jpg";
// const title = "Perseid Meteors over Slovakia";
// const copyright = "Petr Horálek";

const Hero = styled.section`
    ${"" /* background-color: #ffffff;
    background-image: url(${props => props.backgroundImage}) !important;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */}
    background-color: #101d2e;
    background-image: url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%2333f1ed' fill-opacity='0.12' fill-rule='evenodd'/%3E%3C/svg%3E");
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
