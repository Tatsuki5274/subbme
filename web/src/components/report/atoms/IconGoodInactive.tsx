import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import IconBox from "./IconBox";

type PropsType = {
  onClick: React.MouseEventHandler<SVGSVGElement>;
  style: React.CSSProperties;
};

export default function IconGoodInactive(props: PropsType) {
  return (
    <IconBox>
      <ThumbUpIcon color="action" onClick={props.onClick} style={props.style} />
    </IconBox>
  );
}
