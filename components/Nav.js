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
            className="navbar"
            role="navigation"
            aria-label="main navigation">
            <div className="navbar-brand">
                <Link href="/">
                    <a className="navbar-item is-family-secondary">
                        {/* <img src={Logo} alt="Logo" /> */}
                        LOGO
                    </a>
                </Link>
            </div>
            <div className="navbar-end">
                <Link href="/">
                    <a className="navbar-item is-family-secondary">
                        WHAT IS THIS?
                    </a>
                </Link>
            </div>
        </Navbar>
    );
}
