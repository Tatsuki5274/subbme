import { Button } from "antd";
import { Link } from "gatsby";
import React from "react";

export default function TopTemplate() {
  return (
    <div>
      <h1>Hi people</h1>
      <p>
        Haha, Welcome to your new{" "}
        {/* <strong>{this.props.data.site.siteMetadata.title}</strong> site. */}
      </p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
      <Button type="primary">Primary</Button>
    </div>
  );
}
