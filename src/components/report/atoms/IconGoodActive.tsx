import ThumbUpIcon from '@material-ui/icons/ThumbUp';

type PropsType = {
    onClick: React.MouseEventHandler<SVGSVGElement>
}

export default function IconGoodActive(props: PropsType){
    return (
        <ThumbUpIcon
            color="primary"
            onClick={props.onClick}
        />
    )
}