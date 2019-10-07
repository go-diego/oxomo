import React from "react";
import styled from "styled-components";
import ContentLoader from "react-content-loader";
import TextTruncate from "react-text-truncate";
import format from "date-fns/format";
import Image from "../components/Image";
import Loading from "../components/Loading";

const Skeleton = () => (
    <ContentLoader
        height={280}
        width={280}
        speed={1}
        primaryColor={"#333"}
        secondaryColor={"#212121"}>
        <rect x="3" y="3" rx="0" ry="0" width="98%" height="180" />
        <rect x="6" y="190" rx="0" ry="0" width="98%" height="20" />
        <rect x="4" y="215" rx="0" ry="0" width="98%" height="20" />
        <rect x="4" y="242" rx="0" ry="0" width="98%" height="20" />
    </ContentLoader>
);

const Figure = styled.figure`
    overflow: hidden;
    height: 300px;
`;

const StyledImage = styled(Image)`
    transition: all 0.4s ease;
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
    min-height: 300px;
    width: 100%;
`;

const CardImage = styled.div`
    position: initial;
`;

const CardContent = styled.div`
    flex: 1 1 auto;
    flex-direction: column;
`;

const CardFooter = styled.footer`
    display: flex;
    padding: 0.5rem 1.5rem;
`;

export default function NewsCard({
    isLoading,
    src,
    alt,
    title,
    subtitle,
    description,
    link,
    isTargetBlank,
    publicationDate,
    copyrights
}) {
    return (
        <Article className="card box is-paddingless is-clipped">
            {isLoading && <Loading />}
            {!isLoading && (
                <React.Fragment>
                    <CardImage className="card-image has-background-dark">
                        {link && (
                            <StretchedLink
                                title={title}
                                target={isTargetBlank ? "_blank" : null}
                                href={link}>
                                <Figure className="image">
                                    <StyledImage
                                        loaderColor="#33f1ed"
                                        alt={alt}
                                        src={src}
                                    />
                                </Figure>
                            </StretchedLink>
                        )}
                        {!link && (
                            <Figure className="image">
                                <StyledImage
                                    loaderColor="#33f1ed"
                                    alt={alt}
                                    src={src}
                                />
                            </Figure>
                        )}
                    </CardImage>
                    <CardContent className="card-content">
                        <p className="title is-5">{title}</p>
                        {subtitle && (
                            <p className="subtitle is-6">{subtitle}</p>
                        )}
                        {description && (
                            <div className="content">
                                <TextTruncate
                                    line={4}
                                    element="div"
                                    truncateText="…"
                                    text={description}
                                    // textTruncateChild={
                                    //     <a href="#">View Full Story</a>
                                    // }
                                />
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        {copyrights && <span>{copyrights}</span>}
                        <span>
                            {format(new Date(publicationDate), "ddd, MMM Do")}
                        </span>
                    </CardFooter>
                </React.Fragment>
            )}
        </Article>
    );
}
