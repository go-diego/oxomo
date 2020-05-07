import format from "date-fns/format";
import startOfToday from "date-fns/start_of_today";
import { Base64 } from "js-base64";
import PostCard from "./PostCard/index";

export default function ApodCard(props) {
  const { isLoading, media_type, title, hdurl, url, copyright } = props;
  return (
    <PostCard
      link={`/apod?id=${Base64.encode(
        format(startOfToday(), "YYYY-MM-DDTHH:mm:ss")
      )}`}
      mediaType={media_type}
      isLoading={isLoading}
      alt={title}
      src={hdurl || url}
      title={title}
      subtitle="Astronomy Picture of the Day">
      {copyright && <p className="content">by {copyright}</p>}
      <p>
        Each day a different image or photograph of our fascinating universe is
        featured, along with a brief explanation written by a professional
        astronomer.{" "}
      </p>
    </PostCard>
  );
}
