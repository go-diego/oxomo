import Link from "next/link";
import "../styles/site.scss";
import Logo from "../images/logo-white.png";

export default function Nav() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item">
                        <img src={Logo} alt="Logo" />
                    </a>
                </Link>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
        </nav>
    );
}
