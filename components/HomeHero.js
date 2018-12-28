import Nav from "../components/Nav";
import HeroImg from "../images/hero.png";
import "../styles/site.scss";

export default function HomeHero() {
    return (
        <section className="hero is-primary is-bold">
            <div className="hero-head">
                <Nav />
            </div>
            <div className="hero-body has-text-centered">
                <div className="container">
                    <img src={HeroImg} />
                </div>
            </div>
        </section>
    );
}
