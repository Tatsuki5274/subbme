import { Button } from "antd";
import { useModal } from "hooks/CommonHooks";
import React from "react";
import SettingsHomeRemove from "./SettingsHomeRemove";
import firebase from "libs/Firebase";

export default function SettingsHomeDelete(props: { user: firebase.User }) {
  const modalRemove = useModal();
  return (
    <>
      <Button type="primary" danger onClick={modalRemove.handleOpen}>
        退会
      </Button>
      <div>
        <SettingsHomeRemove
          user={props.user}
          visible={modalRemove.isVisible}
          handleClose={modalRemove.handleClose}
        />
      </div>
    </>
  );
}
