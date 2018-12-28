import "../styles/site.scss";
import Logo from "../images/logito.png";

export default function Nav() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src={Logo} alt="Logo" />
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
        </nav>
    );
}
