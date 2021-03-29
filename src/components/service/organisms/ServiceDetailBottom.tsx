import { Button } from "antd";
import WideBox from "components/wrapper/WideBox";

export default function ServiceDetailBottom() {
    return <>
        <WideBox>
            <Button>プラン変更</Button>
        </WideBox>
        <WideBox>
            <Button>アーカイブ</Button>
        </WideBox>
    </>;
}