import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Props } from 'react';

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconGoodInactive(props: PropsType) {
    return (
        <ThumbUpIcon
            color="action"
            onClick={props.onClick}
        />
    );
}