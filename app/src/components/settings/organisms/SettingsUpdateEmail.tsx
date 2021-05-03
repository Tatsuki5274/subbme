import { message, Form, Input, Modal, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { messageAuth } from "common/lang";
import AsyncButton from "components/common/atoms/AsyncButton";
import firebase from "firebase";
import { useUser } from "hooks/UserHooks";
import React from "react";

export default function SettingsUpdateEmail(props: {
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
