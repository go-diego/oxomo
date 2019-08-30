import React from "react";
import styled from "styled-components";
import MarsNewsCard from "./MarsNewsCard";

const Column = styled.div`
    display: flex;
`;

export default function MarsSection() {
    return (
        <div className="columns">
            <Column className="column">
                <MarsNewsCard type="mars-news" />
            </Column>
            <Column className="column">
                <MarsNewsCard type="curiosity" />
            </Column>
            <Column className="column">
                <MarsNewsCard type="science-daily" />
            </Column>
        </div>
    );
}
