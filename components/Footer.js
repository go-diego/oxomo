import styled from "styled-components";
import Emoji from "react-emoji-render";

const StyledFooter = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default function Footer() {
    return (
        <StyledFooter className="footer has-text-light has-background-dark">
            <p>
                Made with{" "}
                <span>
                    <Emoji text=":heart:" />
                </span>{" "}
                in the Coachella Valley
            </p>
            <small>
                By{" "}
                <a
                    className="has-text-weight-bold has-text-light"
                    href="https://www.godiego.me"
                    target="_blank">
                    Diego Bernal
                </a>
            </small>
        </StyledFooter>
    );
}
