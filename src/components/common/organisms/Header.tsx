import styled from "styled-components";
import Text from "../atoms/Text";

export default function Header(){
    return <Style>
        <Title><Text>Subbme</Text></Title>
        
    </Style>;
}

const Style = styled.div({
    backgroundColor: "#5794C3",
    height: "60px"
})

const Title = styled.span({
    color: "#FFFFFF",
    fontSize: "32px",
    display: "inline-block",
    marginLeft: "10px"
})