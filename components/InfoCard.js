import styled from "styled-components";

const Article = styled.article`
    position: ${props => (props.isLink ? "relative" : "initial")};
    min-height: 300px;
    width: 100%;
`;

export default function InfoCard({ className, children, isLink, isLoading }) {
    return (
        <Article
            isLink={isLink || null}
            className={`box is-clipped notification ${className}`}>
            {children}
        </Article>
    );
}
