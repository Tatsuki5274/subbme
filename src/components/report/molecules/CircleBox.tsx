type PropsType = {
    children: string
}

export default function CircleBox(props: PropsType) {
    return (
        <>
        {props.children}
        </>
    );
}