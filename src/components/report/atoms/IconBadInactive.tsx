import { ThumbDown } from "@material-ui/icons";
import React from "react";
import IconBox from "./IconBox";

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconBadInactive(props: PropsType) {
    return (
        <IconBox>
            <ThumbDown
                color="action"
                onClick={props.onClick}
            />
        </IconBox>

    );}