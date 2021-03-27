import RoundImage from "../atoms/RoundImage";
import Logo from "assets/images/google-icon.svg"

type PropsType = {
    alt?: string
    onClick?: () => void
}

export default function ServiceGoogle(props: PropsType) {
    const size = "64px";
    return (
        <RoundImage
            src={Logo}
            size={size}
            alt={props.alt}
            onClick={props.onClick}
        />
    )
}
