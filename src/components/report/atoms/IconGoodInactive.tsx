import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import IconBox from './IconBox';

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconGoodInactive(props: PropsType) {
    return (
        <IconBox>
            <ThumbUpIcon
                color="action"
                onClick={props.onClick}
            />            
        </IconBox>

    );
}