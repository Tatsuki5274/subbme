import styled from "styled-components";

type PropsType = {
  children: string | JSX.Element;
};

export default function CircleBox(props: PropsType) {
  return <Style>{props.children}</Style>;
}

const Style = styled.div({
  width: "100%",
  height: "100%",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "solid 1px #707070",
});
