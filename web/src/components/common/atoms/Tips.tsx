import { Tooltip } from "antd";
import React from "react";
import HelpIcon from "@material-ui/icons/Help";

type PropsType = {
  children: string;
};

export default function Tips(props: PropsType) {
  return (
    <Tooltip title={props.children}>
      <HelpIcon fontSize="small" />
    </Tooltip>
  );
}
