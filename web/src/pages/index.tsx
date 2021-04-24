import * as React from "react";
import Link from "gatsby-link";

export default function Main() {
  return (
    <div>
      <h1>Hi people</h1>
      <p>
        Haha, Welcome to your new{" "}
        {/* <strong>{this.props.data.site.siteMetadata.title}</strong> site. */}
      </p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
    </div>
  );
}
