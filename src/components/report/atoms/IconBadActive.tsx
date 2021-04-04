import { ThumbDown } from "@material-ui/icons";
import IconBox from "./IconBox";

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
    style: React.CSSProperties
}

export default function IconBadActive(props: PropsType){
    return (
        <IconBox>
            <ThumbDown
                color="primary"
                onClick={props.onClick}
                style={props.style}
            />
        </IconBox>

    );
}