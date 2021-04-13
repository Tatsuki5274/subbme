import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React from "react";
import IconBox from "./IconBox";

type PropsType = {
  onClick: React.MouseEventHandler<SVGSVGElement>;
  style: React.CSSProperties;
};

export default function IconGoodActive(props: PropsType) {
  return (
    <IconBox>
      <ThumbUpIcon
        color="primary"
        onClick={props.onClick}
        style={props.style}
      />
    </IconBox>
  );
}
