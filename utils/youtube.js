export default class Youtube {
    constructor(url) {
        this.url = url;
        this.videoId = this.getVideoId(url);
    }

    getVideoId(url) {
        let videoId = "";
        if (url.indexOf("youtube.com/watch?v=") !== -1) {
            videoId = url.substr(url.indexOf("youtube.com/watch?v=") + 20);
        } else if (url.indexOf("youtube.com/watch/?v=") !== -1) {
            videoId = url.substr(url.indexOf("youtube.com/watch/?v=") + 21);
        } else if (url.indexOf("youtu.be") !== -1) {
            videoId = url.substr(url.indexOf("youtu.be") + 9);
        } else if (url.indexOf("www.youtube.com/embed/") !== -1) {
            videoId = url.substr(url.indexOf("www.youtube.com/embed/") + 22);
        } else if (url.indexOf("?v=") !== -1) {
            videoId = url.substr(url.indexOf("?v=") + 3, 11);
        } else {
            videoId = null;
        }

        if (videoId.indexOf("&") !== -1) {
            videoId = videoId.substr(0, videoId.indexOf("&"));
        }
        return videoId;
    }

    normalizedUrl = () => {
        if (!this.videoId) {
            console.warn("Url is not a YouTube link");
            return this.url;
        }

        return `https://www.youtube.com/embed/${this.videoId}`;
    };

    getThumbnail = () => {
        if (!this.videoId) {
            console.warn("Url is not a YouTube link");
            return null;
        }

        return `http://img.youtube.com/vi/${this.videoId}/default.jpg`;
    };

    getFullImage = () => {
        if (!this.videoId) {
            console.warn("Url is not a YouTube link");
            return null;
        }

        return `http://img.youtube.com/vi/${this.videoId}/0.jpg`;
    };
}
