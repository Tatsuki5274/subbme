import { Button } from "antd";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";

type PropsType = {
  children: string;
};

export default function ReportListCreateButton(props: PropsType) {
  return (
    <Link to={routeBuilder.reportNewPath()}>
      <Button type="primary">{props.children}</Button>
    </Link>
  );
}
