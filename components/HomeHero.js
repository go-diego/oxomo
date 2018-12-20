import Nav from "../components/Nav";
import "../styles/site.scss";

export default function HomeHero() {
    return (
        <section className="hero is-primary is-bold">
            <div className="hero-head">
                <Nav />
            </div>
            <div className="hero-body has-text-centered">
                <div className="container">
                    <h2 className="subtitle">Greetings, Earthlings!</h2>
                    <h1 className="title">Welcome to Oxomo</h1>
                </div>
            </div>
        </section>
    );
}
