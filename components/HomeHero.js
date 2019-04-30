import Nav from "../components/Nav";
import HeroImg from "../images/hero.png";
import format from "date-fns/format";

//style={{backgroundImage: `url(${HeroImg})`}}

export default function HomeHero() {
    return (
        <section className="hero is-dark is-bold">
            <div className="hero-head">
                <Nav />
            </div>
            <div className="hero-body has-text-centered">
                <div className="container">
                    <h1 className="is-display-4 is-size-1-mobile">
                        {format(new Date(), "ddd, MMM Do")}
                    </h1>
                </div>
            </div>
        </section>
    );
}
