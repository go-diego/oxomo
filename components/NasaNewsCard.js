import format from "date-fns/format";
import NewsCard from "./NewsCard";

export default function NasaNewsCard({ isLoading, data }) {
    const [article, setArticle] = React.useState({});

    React.useEffect(() => {
        if (data) {
            const {
                pubdate,
                title: newsTitle,
                enclosures,
                image,
                link,
                meta: { title: feedTitle }
            } = data;

            const news = {
                title: newsTitle,
                subtitle: feedTitle,
                src: enclosures.length > 0 ? enclosures[0].url : image.url,
                link,
                description: format(new Date(pubdate), "ddd, MMM Do")
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
        />
    );
}
