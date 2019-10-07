import Link from "next/link";
import Logo from "../images/logo-white.png";
import styled from "styled-components";

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
`;

export default function Nav() {
    return (
        <Navbar
            className="navbar is-dark"
            role="navigation"
            aria-label="main navigation">
            <div className="navbar-brand">
                {/* <Link href="/" passHref> */}
                <a
                    href="/"
                    className="navbar-item is-family-secondary has-text-white has-text-weight-bold">
                    X
                </a>
                {/* </Link> */}
            </div>
            <div className="navbar-end">
                {/* <Link href="/what-is-this" passHref> */}
                <a
                    href="/what-is-this"
                    className="navbar-item is-family-secondary">
                    WHAT IS THIS?
                </a>
                {/* </Link> */}
            </div>
        </Navbar>
    );
}
