import React from "react";
import styled from "styled-components";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        height={280}
        width={280}
        speed={1}
        primaryColor={"#333"}
        secondaryColor={"#212121"}>
        <rect x="3" y="3" rx="10" ry="10" width="98%" height="180" />
        <rect x="6" y="190" rx="0" ry="0" width="98%" height="20" />
        <rect x="4" y="215" rx="0" ry="0" width="98%" height="20" />
        <rect x="4" y="242" rx="0" ry="0" width="98%" height="20" />
    </ContentLoader>
);

const Figure = styled.figure`
    overflow: hidden;
    height: 200px;
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
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const CardImage = styled.div`
    position: initial;
`;

const CardContent = styled.div`
    flex: 1 1 auto;
    flex-direction: column;
`;

export default function NewsCard({
    isLoading,
    src,
    alt,
    title,
    subtitle,
    description,
    link,
    isTargetBlank
}) {
    return (
        <Article className="card box is-paddingless is-clipped">
            {(!isLoading && (
                <React.Fragment>
                    <CardImage className="card-image">
                        <StretchedLink
                            title={title}
                            target={isTargetBlank ? "_blank" : null}
                            href={link}>
                            <Figure className="image">
                                <Img alt={alt} src={src} />
                            </Figure>
                        </StretchedLink>
                    </CardImage>
                    <CardContent className="card-content">
                        <p className="title is-6">{title}</p>
                        {subtitle && (
                            <p className="subtitle is-6">{subtitle}</p>
                        )}
                        {description && (
                            <div className="content">{description}</div>
                        )}
                    </CardContent>
                </React.Fragment>
            )) || <Skeleton />}
        </Article>
    );
}
