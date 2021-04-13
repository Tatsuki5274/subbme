import { Empty } from "antd";
import React from "react";

type PropsType = {
  children?: JSX.Element;
};

export default function EmptyData(props: PropsType) {
  return <Empty description="データがありません">{props.children}</Empty>;
}
