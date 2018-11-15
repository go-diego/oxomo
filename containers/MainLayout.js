import React from "react";
import Head from "../components/Head";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import css from "../styles/site.scss";

export default ({children, title = "This is the default title"}) => (
    <div className={css.root}>
        <Head>
            <title>{title}</title>
        </Head>
        <header>
            <Nav />
        </header>

        <main className={css.main}>{children}</main>

        <Footer />
    </div>
);
