import Modal from "antd/lib/modal/Modal";
import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import { useModal } from "hooks/CommonHooks";
import styled from "styled-components";
import SettingsRow from "../molecules/SettingsRow";
import { Button, Form, FormInstance, Input, message } from "antd";
import React, { useRef } from "react";
import { useUser } from "hooks/UserHooks";
import firebase from "libs/Firebase";
import { messageAuth } from "common/lang";
import { useForm } from "antd/lib/form/Form";
import AsyncButton from "components/common/atoms/AsyncButton";

type PasswordFormType = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export default function SettingsHome() {
  const { currentUser } = useUser();
  const [formPassword] = useForm<PasswordFormType>();
  const modalPassword = useModal();
  const minLengthPassword = 7;
  const handleOKUpdatePassword = () => {
    formPassword.submit();
  };
  const onFinishUpdatePassword = async (values: PasswordFormType) => {
    if (values.newPassword !== values.newPasswordConfirm) {
      message.error("入力したパスワードが異なります");
      return;
    }
    if (!currentUser?.email) {
      // ユーザーのemailが取得できない場合
      throw new Error("User is not signedin.");
    }
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      values.currentPassword
    );
    try {
      await currentUser.reauthenticateWithCredential(credential);
      await currentUser?.updatePassword(values.newPassword);
      message.success("パスワードの変更が成功しました");
      modalPassword.handleClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message, e.code);
      message.warn(messageAuth(e));
    }
  };

  // const credential = firebase.auth.EmailAuthProvider.credential(
  //   currentUser?.email || "",
  //   "currentPassword"
  // );
  // currentUser
  //   ?.reauthenticateWithCredential(credential)
  //   .then(function () {
  //     // User re-authenticated.
  //   })
  //   .catch(function (error) {
  //     // An error happened.
  //     console.error(error);
  //   });

  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <RowsWrapperStyle>
        <SettingsRow label="メールアドレス" value="hoge@subbme.com" disabled />
        <SettingsRow
          onClick={modalPassword.handleOpen}
          label="パスワード"
          value="********"
        />
      </RowsWrapperStyle>
      <div>
        <Modal
          title="パスワード変更"
          visible={modalPassword.isVisible}
          onOk={handleOKUpdatePassword}
          onCancel={modalPassword.handleClose}
          cancelText="キャンセル"
          footer={[
            <Button key="cancel" onClick={modalPassword.handleClose}>
              キャンセル
            </Button>,
            <AsyncButton
              key="ok"
              type="primary"
              onClick={handleOKUpdatePassword}
            >
              OK
            </AsyncButton>,
          ]}
        >
          <Form<PasswordFormType>
            form={formPassword}
            onFinish={onFinishUpdatePassword}
          >
            <Form.Item
              label="現在のパスワード"
              name="currentPassword"
              rules={[{ required: true, message: "入力してください" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="新しいパスワード"
              name="newPassword"
              rules={[
                { required: true, message: "入力してください" },
                {
                  min: minLengthPassword,
                  message: `パスワードは最低${minLengthPassword}文字以上必要です`,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="パスワード確認"
              name="newPasswordConfirm"
              rules={[
                { required: true, message: "入力してください" },
                {
                  min: minLengthPassword,
                  message: `パスワードは最低${minLengthPassword}文字以上必要です`,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

const RowsWrapperStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});

function modalUpdatePassword() {
  return null;
}
