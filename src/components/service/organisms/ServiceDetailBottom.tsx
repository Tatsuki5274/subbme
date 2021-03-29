import { Button } from "antd";
import WideBox from "components/wrapper/WideBox";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";

type PropsType = {
    serviceID: string
}

export default function ServiceDetailBottom(props: PropsType) {
    const onClickArchive = async () => {
        console.log("onClickArchive");
    }
    return <>
        <WideBox>
            <Link to={routeBuilder.serviceEditPath(props.serviceID)}>
                <Button
                    type="primary"
                >プラン変更</Button>
            </Link>

        </WideBox>
        <WideBox>
            <Button
                danger
                type="primary"
                onClick={onClickArchive}
            >アーカイブ</Button>
        </WideBox>
    </>;
}