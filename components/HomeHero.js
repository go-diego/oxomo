import Nav from "../components/Nav";
import HeroImg from "../images/hero.png";
import "../styles/site.scss";

//style={{backgroundImage: `url(${HeroImg})`}}

export default function HomeHero() {
    return (
        <section className="hero is-dark is-bold is-medium">
            <div className="hero-head">
                <Nav />
            </div>
            <div className="hero-body has-text-centered">
                <div className="container" />
            </div>
        </section>
    );
}
