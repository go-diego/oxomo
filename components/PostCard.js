import styled from "styled-components";

const PostCardContent = styled.div`
    padding: 1rem;
`;

const Figure = styled.figure`
    overflow: hidden;
    height: 300px;
`;

const Img = styled.img`
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
`;

export default function PostCard({ src, alt, title, subtitle, description }) {
    return (
        <div className="box is-paddingless is-clipped">
            <div className="columns">
                <div className="column is-paddingless">
                    <Figure className="image">
                        <Img alt={alt} src={src} />
                    </Figure>
                </div>
                <div className="column">
                    <PostCardContent>
                        <p className="title is-size-4-mobile">{title}</p>
                        {subtitle && (
                            <p className="subtitle is-size-6-mobile">
                                {subtitle}
                            </p>
                        )}
                        {/* <p className="is-size-6">{description}</p> */}
                    </PostCardContent>
                </div>
            </div>
        </div>
    );
}
