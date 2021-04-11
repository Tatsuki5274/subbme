import { ThumbDown } from "@material-ui/icons";
import React from "react";
import IconBox from "./IconBox";

type PropsType = {
  onClick: React.MouseEventHandler<SVGSVGElement>;
  style: React.CSSProperties;
};

export default function IconBadInactive(props: PropsType) {
  return (
    <IconBox>
      <ThumbDown color="action" onClick={props.onClick} style={props.style} />
    </IconBox>
  );
}
