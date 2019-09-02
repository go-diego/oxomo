import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";

//TODO: use env variables for url
const defaultDescription = "";
const defaultOGURL =
    process.env.CONTEXT === "production"
        ? "https://www.oxomo.co"
        : "https://development.oxomo.co";
const defaultOGImage = "./static/thumbnail.png";

const Head = props => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>{props.title || "OXOMO"}</title>
        <meta
            name="description"
            content={props.description || defaultDescription}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta property="og:url" content={props.url || defaultOGURL} />
        <meta property="og:title" content={props.title || ""} />
        <meta
            property="og:description"
            content={props.description || defaultDescription}
        />
        <meta name="twitter:site" content={props.url || defaultOGURL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script
            key="fontawesome"
            defer
            src="https://use.fontawesome.com/releases/v5.6.3/js/all.js"
            integrity="sha384-EIHISlAOj4zgYieurP0SdoiBYfGJKkgWedPHH4jCzpCXLmzVsw1ouK59MuUtP4a1"
            crossOrigin="anonymous"
        />
    </NextHead>
);

Head.propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string
};

export default Head;
