import Head from "next/head";
import React from "react";

interface HeadProps {
  title: string;
}

export const CustomHeader: React.FC<HeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Seven vs. Wild Bingo Game" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Create your own Bingo Card for the second season of Seven vs. Wild"
      />
      <meta property="og:url" content="https://sevenvsbingo.de/" />
      <meta property="og:type" content="website" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};