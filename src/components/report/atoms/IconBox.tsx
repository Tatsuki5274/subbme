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
    width: "90px",
    height: "90px",
    border: "solid 1px #707070",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})