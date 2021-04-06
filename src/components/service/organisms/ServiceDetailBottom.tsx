import { Button, message, Popconfirm } from "antd";
import WideBox from "components/wrapper/WideBox";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { ServiceManager } from "repositories/Services";
import { routeBuilder } from "router";
import styled from "styled-components";

type PropsType = {
    serviceID: string
}

export default function ServiceDetailBottom(props: PropsType) {
    const history = useHistory();
    const onClickArchive = async () => {
        console.log("onClickArchive");
        const manager = new ServiceManager();
        const result = await manager.update({
            id: props.serviceID,
            isArchived: true
        });
        if (result) {
            message.success("アーカイブしました");
        } else {
            message.error("アーカイブに失敗しました");
        }
    };
    const onClickDelete = async () => {
        const manager = new ServiceManager();
        await manager.delete(props.serviceID);
        message.success("削除しました");
        history.push(routeBuilder.serviceListPath());
    };
    return <>
        <SpaceButtonStyle>
            <Link to={routeBuilder.serviceEditPath(props.serviceID)}>
                <Button
                    block
                    type="primary"
                >プラン変更</Button>
            </Link>
        </SpaceButtonStyle>

        <SpaceButtonStyle>
            <Button
                danger
                block
                onClick={onClickArchive}
            >アーカイブ</Button>
        </SpaceButtonStyle>
        <SpaceButtonStyle>
            <Popconfirm
                title="サービス情報を削除しますか？この操作は取り消せません。"
                onConfirm={onClickDelete}
            >
                <Button
                    danger
                    block
                    type="primary"
                >削除</Button>
            </Popconfirm>

        </SpaceButtonStyle>
    </>;
}

const SpaceButtonStyle = styled.div({
    margin: "25px 0",
})