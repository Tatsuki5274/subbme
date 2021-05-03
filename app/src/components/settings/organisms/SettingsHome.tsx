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

export default function SettingsHome() {
  const { currentUser } = useUser();
  const modalPassword = useModal();
  const modalEmail = useModal();
  // email / password の認証に関する情報
  const passwordProvider = currentUser?.providerData.find((provider) => {
    return provider?.providerId === "password";
  });
  // google 認証に関する情報
  const googleProvider = currentUser?.providerData.find((provider) => {
    return provider?.providerId === "google.com";
  });
  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <RowsWrapperStyle>
        <SettingsRow
          label="メールアドレス"
          value={`${currentUser?.email || ""}(${
            currentUser?.emailVerified ? "確認済み" : "未確認"
          })`}
          onClick={modalEmail.handleOpen}
        />
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
        <ModalUpdateEmail
          visible={modalEmail.isVisible}
          handleClose={modalEmail.handleClose}
        />
      </div>
      <SubTitle>アカウント連携</SubTitle>
      <div>
        {passwordProvider ? "連携済み" : <Button type="primary">連携</Button>}{" "}
        メールアドレス/パスワード認証{" "}
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
  type PasswordFormType = {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  };
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

function ModalUpdateEmail(props: {
  visible: boolean;
  handleClose: () => void;
}) {
  // メールアドレス変更フォームの型
  type FormFieldType = {
    currentPassword: string;
    newEmail: string;
  };
  const { currentUser } = useUser();
  const [form] = useForm<FormFieldType>();
  const handleOK = async () => {
    await form.validateFields();
    await handleSubmit(form.getFieldsValue());
  };
  const handleCancel = () => {
    form.resetFields();
    props.handleClose();
  };
  const handleSubmit = async (values: FormFieldType) => {
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
      await currentUser.updateEmail(values.newEmail);
      await currentUser.sendEmailVerification();
      message.success("パスワードの変更が成功しました");
      form.resetFields();
      props.handleClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message, e.code);
      message.warn(messageAuth(e));
    }
  };

  return (
    <Modal
      title="メールアドレス変更"
      onOk={handleOK}
      onCancel={handleCancel}
      visible={props.visible}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          キャンセル
        </Button>,
        <AsyncButton key="ok" type="primary" onClick={handleOK}>
          OK
        </AsyncButton>,
      ]}
    >
      <Form<FormFieldType> form={form}>
        <Form.Item
          label="現在のパスワード"
          name="currentPassword"
          rules={[{ required: true, message: "入力してください" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="変更後のメールアドレス"
          name="newEmail"
          rules={[
            { required: true, message: "入力してください" },
            {
              type: "email",
              message: "正しい形式で入力してください",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
