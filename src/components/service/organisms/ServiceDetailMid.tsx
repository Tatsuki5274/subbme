import GrayText from "components/common/atoms/GrayText"
import styled from "styled-components";

type PropsType = {
    detail: string
}

export default function ServiceDetailMid(props: PropsType) {
    return <BackGroundStyle>
        <GrayText>{props.detail}</GrayText>
    </BackGroundStyle>;
}

const BackGroundStyle = styled.div({
    // backgroundColor: "#F2F2F2",
    // position: "absolute",
    // left: "0",
    width: "100%",
    padding: "0 15%",
})