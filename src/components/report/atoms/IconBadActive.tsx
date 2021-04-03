import { ThumbDown } from "@material-ui/icons";

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconBadActive(props: PropsType){
    return (
        <ThumbDown
            color="primary"
            onClick={props.onClick}
        />
    );
}