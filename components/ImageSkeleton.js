import React from "react";
import styled from "styled-components";
import ContentLoader from "react-content-loader";

const StyledLoader = styled(ContentLoader)`
    height: 100%;
    width: 100%;
`;

export default function ImageSkeleton({ className }) {
    return (
        <StyledLoader
            className={className}
            height={150}
            width={300}
            speed={1}
            primaryColor={"#333"}
            secondaryColor={"#212121"}>
            <rect x="3" y="3" rx="0" ry="0" width="98%" height="100%" />
        </StyledLoader>
    );
}
