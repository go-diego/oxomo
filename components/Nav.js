import Link from "next/link";
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
            </div>
        </nav>
    );
}
