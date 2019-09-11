import React from "react";
import styled from "styled-components";
import ProgressiveImage from "react-progressive-image";
import ImageSkeleton from "../components/ImageSkeleton";

const Img = styled.img`
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
`;

export default function Image({ src, alt, isLoading, className }) {
    return (
        <React.Fragment>
            {isLoading && <ImageSkeleton />}
            {!isLoading && (
                <ProgressiveImage src={src} placeholder="">
                    {(src, loading) => {
                        return loading ? (
                            <ImageSkeleton />
                        ) : (
                            <Img className={className} src={src} alt={alt} />
                        );
                    }}
                </ProgressiveImage>
            )}
        </React.Fragment>
    );
}
