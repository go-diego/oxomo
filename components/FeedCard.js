import NewsCard from "./NewsCard";

export default function NasaNewsCard({ isLoading, data, index }) {
    const [article, setArticle] = React.useState({});

    React.useEffect(() => {
        if (data) {
            const item = index ? data.items[index] : data.items[0];
            const news = {
                title: item.title,
                subtitle: data.title,
                src:
                    (item.media_thumbnail && item.media_thumbnail.url) ||
                    (item.media_content && item.media_content.url) ||
                    (item.enclosure && item.enclosure.url) ||
                    (data.image && data.image.url) ||
                    null,
                link: item.link,
                description: item.contentSnippet,
                publication_date: item.publication_date || item.isoDate
            };
            setArticle(news);
        }
    }, [data]);

    return (
        <NewsCard
            isTargetBlank
            isLoading={isLoading}
            title={article.title}
            subtitle={article.subtitle}
            alt={article.title}
            src={article.src}
            link={article.link}
            description={article.description}
            publicationDate={article.publication_date}
        />
    );
}
