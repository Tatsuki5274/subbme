import styled from "styled-components"

type PropsType = {
    children: JSX.Element
}

export default function ContentWrapper(props: PropsType){
    return (
        <Style>
            {props.children}
        </Style>
    )
}

const Style = styled.div({
    width: "90%",
    margin: "0 auto",
    // padding: "20% 0 0 0"
})