import { ThumbDown } from "@material-ui/icons";
import React from "react";

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconBadInactive(props: PropsType) {
    return (
        <ThumbDown
            color="action"
            onClick={props.onClick}
        />
    );}