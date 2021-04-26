import React from "react";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <html lang="ja" />
        <title>About | Subbme</title>
        <meta name="description" content="Subbmeについて" />
      </Helmet>
      <span>作成中</span>
    </>
  );
}
