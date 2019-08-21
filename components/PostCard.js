import React from "react";
import styled from "styled-components";
import ContentLoader from "react-content-loader";

const ContentSkeleton = () => (
    <ContentLoader
        height={150}
        width={300}
        speed={1}
        primaryColor={"#333"}
        secondaryColor={"#212121"}>
        <rect x="6" y="5" rx="0" ry="0" width="95%" height="30" />
        <rect x="6" y="40" rx="0" ry="0" width="95%" height="15" />
        <rect x="6" y="60" rx="0" ry="0" width="95%" height="15" />
    </ContentLoader>
);

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

const PostCardContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const Content = styled.div`
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

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
            transform: translate3D(0, -1px, 0) scale(1.1);
        }
    }
`;

const Article = styled.article`
    min-height: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
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

const Row = styled.div`
    flex-grow: 1;
`;

export default function PostCard({
    mediaType,
    isReversed,
    isLoading,
    src,
    alt,
    title,
    subtitle,
    description,
    link,
    isTargetBlank,
    children
}) {
    return (
        <Article className="box is-paddingless is-clipped">
            <Row className="columns is-marginless">
                {(isReversed && (
                    <React.Fragment>
                        <div className="column is-two-fifths">
                            {(!isLoading && (
                                <PostCardContent>
                                    <div>
                                        <p className="title is-size-4-mobile">
                                            {title}
                                        </p>
                                        {subtitle && (
                                            <p className="subtitle is-size-6-mobile">
                                                {subtitle}
                                            </p>
                                        )}
                                    </div>
                                    <Content>{children}</Content>
                                </PostCardContent>
                            )) || <ContentSkeleton />}
                        </div>
                        <div className="column is-paddingless">
                            {(!isLoading && (
                                <StretchedLink
                                    title={title}
                                    target={isTargetBlank ? "_blank" : null}
                                    href={link}>
                                    {mediaType !== "video" && (
                                        <Figure className="image">
                                            <Img alt={alt} src={src} />
                                        </Figure>
                                    )}
                                    {mediaType === "video" && (
                                        <EmbedItem src={src} allowFullScreen />
                                    )}
                                </StretchedLink>
                            )) || <ImageSkeleton />}
                        </div>
                    </React.Fragment>
                )) || (
                    <React.Fragment>
                        <div className="column is-three-fifths is-paddingless">
                            {(!isLoading && (
                                <React.Fragment>
                                    {mediaType !== "video" && (
                                        <StretchedLink
                                            title={title}
                                            target={
                                                isTargetBlank ? "_blank" : null
                                            }
                                            href={link}>
                                            <Figure className="image">
                                                <Img alt={alt} src={src} />
                                            </Figure>
                                        </StretchedLink>
                                    )}
                                    {mediaType === "video" && (
                                        <EmbedItem src={src} allowFullScreen />
                                    )}
                                </React.Fragment>
                            )) || <ImageSkeleton />}
                        </div>
                        <div className="column">
                            {(!isLoading && (
                                <PostCardContent>
                                    <div>
                                        <p className="title is-size-4-mobile">
                                            {title}
                                        </p>
                                        {subtitle && (
                                            <p className="subtitle is-size-6-mobile">
                                                {subtitle}
                                            </p>
                                        )}
                                    </div>
                                    <Content>{children}</Content>
                                </PostCardContent>
                            )) || <ContentSkeleton />}
                        </div>
                    </React.Fragment>
                )}
            </Row>
        </Article>
    );
}
