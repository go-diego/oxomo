import React from "react";
import Head from "../components/Head";
import Footer from "../components/Footer";

export default ({ children, title, description }) => (
    <div className="root">
        <Head title={title} description={description} />
        <main className="main">{children}</main>
        <Footer />
    </div>
);
