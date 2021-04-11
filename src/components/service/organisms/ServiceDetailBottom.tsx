import { Button, message, Popconfirm } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ServiceManager } from "repositories/Services";
import { routeBuilder } from "router";
import styled from "styled-components";

type PropsType = {
  serviceID: string;
  isArchived: boolean;
};

export default function ServiceDetailBottom(props: PropsType) {
  const history = useHistory();
  const [isArchived, setIsArchived] = useState(props.isArchived);
  const onClickArchive = async () => {
    const manager = new ServiceManager();
    const result = await manager.update({
      id: props.serviceID,
      isArchived: true,
    });
    if (result) {
      setIsArchived(true);
      message.success("アーカイブしました");
    } else {
      message.error("アーカイブに失敗しました");
    }
  };
  const onClickUnarchive = async () => {
    const manager = new ServiceManager();
    const result = await manager.update({
      id: props.serviceID,
      isArchived: false,
    });
    if (result) {
      setIsArchived(false);
      message.success("アーカイブを解除しました");
    } else {
      message.error("アーカイブの解除に失敗しました");
    }
  };
  const onClickDelete = async () => {
    const manager = new ServiceManager();
    await manager.delete(props.serviceID);
    message.success("削除しました");
    history.push(routeBuilder.serviceListPath());
  };
  return (
    <>
      <SpaceButtonStyle>
        <Link to={routeBuilder.serviceEditPath(props.serviceID)}>
          <Button block type="primary">
            サービス情報変更
          </Button>
        </Link>
      </SpaceButtonStyle>

      <SpaceButtonStyle>
        {isArchived ? (
          <Button danger block onClick={onClickUnarchive}>
            アーカイブ解除
          </Button>
        ) : (
          <Button danger block onClick={onClickArchive}>
            アーカイブ
          </Button>
        )}
      </SpaceButtonStyle>

      <SpaceButtonStyle>
        <Popconfirm
          title="サービス情報を削除しますか？この操作は取り消せません。"
          onConfirm={onClickDelete}
        >
          <Button danger block type="primary">
            削除
          </Button>
        </Popconfirm>
      </SpaceButtonStyle>
    </>
  );
}

const SpaceButtonStyle = styled.div({
  margin: "25px 0",
});
