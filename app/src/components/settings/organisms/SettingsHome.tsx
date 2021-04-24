import Modal from "antd/lib/modal/Modal";
import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import { useModal } from "hooks/CommonHooks";
import styled from "styled-components";
import SettingsRow from "../molecules/SettingsRow";
import { Button, Form, Input, message } from "antd";
import React from "react";
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
  const modalPassword = useModal();
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
        <ModalUpdatePassword
          visible={modalPassword.isVisible}
          handleClose={modalPassword.handleClose}
        />
      </div>
    </>
  );
}

const RowsWrapperStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});

/**
 * @description パスワード変更モーダルの処理
 */
function ModalUpdatePassword(props: {
  visible: boolean;
  handleClose: () => void;
}) {
  const { currentUser } = useUser();
  const [form] = useForm<PasswordFormType>();
  const minLengthPassword = 7;
  const handleOK = async () => {
    // form.submit();
    await form.validateFields();
    await onFinishUpdatePassword(form.getFieldsValue());
  };
  const handleClose = () => {
    form.resetFields();
    props.handleClose();
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
      props.handleClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message, e.code);
      message.warn(messageAuth(e));
    }
  };
  return (
    <Modal
      title="パスワード変更"
      visible={props.visible}
      cancelText="キャンセル"
      onCancel={handleClose}
      onOk={handleOK}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          キャンセル
        </Button>,
        <AsyncButton key="ok" type="primary" onClick={handleOK}>
          OK
        </AsyncButton>,
      ]}
    >
      <Form<PasswordFormType> form={form} onFinish={onFinishUpdatePassword}>
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
  );
}
