import { Link } from "react-router-dom"
import styled from "styled-components"

type PropsType = {
    to: string
    children: JSX.Element
}

/**
 * 
 * @param to 宛先URL
 * @param children リンク化対象ブロック
 * @returns 
 */
export default function LinkedBlock(props: PropsType) {
    return (
        <BaseStyle>
            {props.children}
            <Link to={props.to} style={LinkStyle}/>
        </BaseStyle>
    )
}

const BaseStyle = styled.div({
    position: "relative",
})

const LinkStyle: React.CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    textIndent: "-999px",
}