import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export default function ErrorTile(props) {
    return (
        <Container className="box">
            <span className="heading">Error</span>
        </Container>
    );
}
