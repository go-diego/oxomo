import Link from "next/link";
import "../styles/site.scss";

// const links = [{href: "https://github.com/segmentio/create-next-app", label: "Github"}].map(
//     link => {
//         link.key = `nav-link-${link.href}-${link.label}`;
//         return link;
//     }
// );

export default function Nav() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
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
