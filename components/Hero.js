import styled from "styled-components";
import {APOD} from "../api/nasa.api";

const nasaApodApi = new APOD();

const Hero = styled.section`
    ${"" /* background-color: #ffffff;
    background-image: url(${props => props.backgroundImage});
    min-height: 50vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover; */}
`;

// const Box = styled.div`
//     margin-bottom: -2.5rem;
//     width: 75%;
//     z-index: 1;
// `;

const Figure = styled.figure`
    min-height: 50vh;
`;

export default function HomeHero() {
    const [backgroundImage, setBackgroundImage] = React.useState(null);

    React.useEffect(() => {
        async function getData() {
            const response = await nasaApodApi.get();
            console.log("IMAGE", response);
            setBackgroundImage(response.hdurl || response.url);
        }
        getData();
    }, []);

    return (
        <Hero className="hero is-medium">
            <Figure class="image">
                <img src={backgroundImage} />
            </Figure>
            {/* <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="is-family-secondary title">Diego Bernal</h1>
                    <h2 className="subtitle is-uppercase">
                        Front-End Developer
                    </h2>
                    <h2 className="subtitle is-5">
                        Coachella Valley, California
                    </h2>
                </div>
            </div> */}
        </Hero>
    );
}
