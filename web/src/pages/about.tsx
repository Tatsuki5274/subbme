import React from "react";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <html lang="ja" />
        <title>About | Subbny</title>
        <meta name="description" content="Subbnyについて" />
      </Helmet>
      <span>作成中</span>
    </>
  );
}
