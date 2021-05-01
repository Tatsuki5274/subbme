import * as React from "react";
import TopTemplate from "components/top/templates/TopTemplate";
import { Helmet } from "react-helmet";

export default function Main() {
  return (
    <>
      <Helmet>
        <html lang="ja" />
        <title>Top | Subblish</title>
        <meta
          name="description"
          content="固定費を狙い撃ちするアプリ、Subblishです"
        />
      </Helmet>
      <TopTemplate />
    </>
  );
}
