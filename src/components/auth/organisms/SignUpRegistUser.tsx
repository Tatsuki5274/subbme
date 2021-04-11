import React from "react";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";

export default function SignUpRegistUser() {
  return (
    <span>
      既にご利用の方は
      <Link to={routeBuilder.signInPath()}>こちら</Link>
    </span>
  );
}
