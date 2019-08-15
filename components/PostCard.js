import React from "react";
import styled from "styled-components";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        height={70}
        width={280}
        speed={1}
        primaryColor={"#333"}
        secondaryColor={"#212121"}>
        <rect x="3" y="3" rx="10" ry="10" width="50%" height="67" />
        <rect x="150" y="5" rx="0" ry="0" width="45%" height="15" />
        <rect x="150" y="25" rx="0" ry="0" width="45%" height="10" />
    </ContentLoader>
);

const PostCardContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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
`;

export default function PostCard({
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
            {(!isLoading && (
                <div className="columns">
                    {(isReversed && (
                        <React.Fragment>
                            <div className="column is-two-fifths">
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
                                    {children}
                                </PostCardContent>
                            </div>
                            <div className="column">
                                <StretchedLink
                                    title={title}
                                    target={isTargetBlank ? "_blank" : null}
                                    href={link}>
                                    <Figure className="image">
                                        <Img alt={alt} src={src} />
                                    </Figure>
                                </StretchedLink>
                            </div>
                        </React.Fragment>
                    )) || (
                        <React.Fragment>
                            <div className="column is-three-fifths">
                                <StretchedLink
                                    title={title}
                                    target={isTargetBlank ? "_blank" : null}
                                    href={link}>
                                    <Figure className="image">
                                        <Img alt={alt} src={src} />
                                    </Figure>
                                </StretchedLink>
                            </div>
                            <div className="column">
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
                                    {children}
                                </PostCardContent>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            )) || <Skeleton />}
        </Article>
    );
}
