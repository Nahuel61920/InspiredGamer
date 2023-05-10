import React from "react";
import Head from "next/head";

export default function Seo(props: any) {
  const { title, description } = props;
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
    </Head>
  );
}

Seo.defaultProps = {
  title: "InspiredGamer",
  description: "The best games at your fingertips",
};
