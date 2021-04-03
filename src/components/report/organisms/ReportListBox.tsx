import styled from "styled-components";
import CircleBox from "../molecules/CircleBox";

export default function ReportListBox() {
    return (
        <CircleStyle>
            <CircleBox>10</CircleBox>
        </CircleStyle>
    );
}

const CircleStyle = styled.div({
    width: "70px",
    height: "70px",
})