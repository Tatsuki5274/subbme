import styled from "styled-components";

type PropsType = {
    children: JSX.Element
}

export default function IconBox(props: PropsType) {
    return (
        <BoxStyle>
            {props.children}
        </BoxStyle>
    );
}

const BoxStyle = styled.div({
    width: "100px",
    height: "100px",
    border: "solid 1px #707070",
    borderRadius: "10px",
    display: "inline-block",
})