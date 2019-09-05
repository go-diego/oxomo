// TODO: use isReversed props to add classes instead of conditionally rendering

import React from "react";
import styled from "styled-components";
import Content from "./PostCard/Content";
import Media from "./PostCard/Media";

const Article = styled.article`
    min-height: 300px;
    position: relative;
    display: flex;
    flex-direction: column;
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
    linkAs,
    isTargetBlank,
    children
}) {
    return (
        <Article className="box is-paddingless is-clipped">
            <Row className="columns is-marginless">
                {(isReversed && (
                    <React.Fragment>
                        <div className="column is-two-fifths">
                            <Content
                                isLoading={isLoading}
                                title={title}
                                subtitle={subtitle}>
                                {children}
                            </Content>
                        </div>
                        <div className="column is-paddingless">
                            <Media
                                link={link}
                                src={src}
                                alt={alt}
                                isTargetBlank={isTargetBlank}
                                title={title}
                                isLoading={isLoading}
                                mediaType={mediaType}
                            />
                        </div>
                    </React.Fragment>
                )) || (
                    <React.Fragment>
                        <div className="column is-three-fifths is-paddingless">
                            <Media
                                link={link}
                                src={src}
                                alt={alt}
                                isTargetBlank={isTargetBlank}
                                title={title}
                                isLoading={isLoading}
                                mediaType={mediaType}
                            />
                        </div>
                        <div className="column">
                            <Content
                                isLoading={isLoading}
                                title={title}
                                subtitle={subtitle}>
                                {children}
                            </Content>
                        </div>
                    </React.Fragment>
                )}
            </Row>
        </Article>
    );
}
