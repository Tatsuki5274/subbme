import { Button, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { messageAuth } from "common/lang";
import AsyncButton from "components/common/atoms/AsyncButton";
import firebase from "firebase";
import { useUser } from "hooks/UserHooks";
import React from "react";

export default function SettingsUpdatePassword(props: {
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
