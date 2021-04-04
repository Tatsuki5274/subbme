import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import React from 'react';
import IconBox from './IconBox';

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconGoodActive(props: PropsType){
    return (
        <IconBox>
            <ThumbUpIcon
                color="primary"
                onClick={props.onClick}
            />
        </IconBox>

    )
}