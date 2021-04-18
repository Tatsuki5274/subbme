import styled from "styled-components";

type PropsType = {
  src: string;
  alt?: string;
  size: string;
  onClick?: () => void;
};

export default function RoundImage(props: PropsType) {
  // Todo 警告の対処
  /*
    The component styled.img with the id of "sc-cOajty" has been created dynamically.
    You may see this warning because you've called styled inside another component.
    To resolve this only create new StyledComponents outside of any render method and function component.
    */
  const StyledImg = styled.img({
    borderRadius: "50%",
    width: props.size,
    height: props.size,
  });

  return <StyledImg src={props.src} alt={props.alt} onClick={props.onClick} />;
}
