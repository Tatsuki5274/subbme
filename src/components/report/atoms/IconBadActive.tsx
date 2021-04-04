import { ThumbDown } from "@material-ui/icons";
import IconBox from "./IconBox";

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconBadActive(props: PropsType){
    return (
        <IconBox>
            <ThumbDown
                color="primary"
                onClick={props.onClick}
            />
        </IconBox>

    );
}