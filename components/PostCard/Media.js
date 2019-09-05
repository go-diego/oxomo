import React from "react";
import Link from "next/link";
import styled from "styled-components";
import ContentLoader from "react-content-loader";

const ImageSkeleton = () => (
    <ContentLoader
        height={150}
        width={300}
        speed={1}
        primaryColor={"#333"}
        secondaryColor={"#212121"}>
        <rect x="3" y="3" rx="0" ry="0" width="98%" height="95%" />
    </ContentLoader>
);

const Figure = styled.figure`
    overflow: hidden;
    height: 300px;
`;

const Img = styled.img`
    transition: all 0.4s ease;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
`;

const StretchedLink = styled.a`
    &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        content: "";
    }

    &:hover {
        img {
            transition: all 0.4s ease;
            transform: translate3d(0, -1px, 0) scale(1.1);
        }
    }
`;

const EmbedItem = styled.iframe`
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    min-height: 300px;
`;

export default function Media({
    isLoading,
    mediaType,
    title,
    isTargetBlank,
    link,
    linkAs,
    src,
    alt
}) {
    const StretchedLinkWithRef = React.forwardRef(
        ({ children, href, title, target }, ref) => (
            <StretchedLink ref={ref} href={href} title={title} target={target}>
                {children}
            </StretchedLink>
        )
    );

    return (
        <React.Fragment>
            {isLoading && <ImageSkeleton />}
            {!isLoading && (
                <React.Fragment>
                    {mediaType === "video" && (
                        <EmbedItem src={src} allowFullScreen />
                    )}
                    {mediaType !== "video" && link && (
                        <Link href={link} as={linkAs} passHref>
                            <StretchedLinkWithRef
                                title={title}
                                target={isTargetBlank ? "_blank" : null}>
                                <Figure className="image">
                                    <Img alt={alt} src={src} />
                                </Figure>
                            </StretchedLinkWithRef>
                        </Link>
                    )}
                    {mediaType !== "video" && !link && (
                        <Figure className="image">
                            <Img alt={alt} src={src} />
                        </Figure>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
