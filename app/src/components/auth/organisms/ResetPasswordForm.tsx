import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { auth } from "libs/Types";
import useForm from "antd/lib/form/hooks/useForm";
import { messageAuth } from "common/lang";

type FormType = {
  email: string;
};

export default function ResetPasswordForm(props: {
  visible: boolean;
  handleClose: () => void;
}) {
  const [form] = useForm();
  const onClickOK = async () => {
    await form.validateFields();
    form.submit();
  };
  const onClickCancel = () => {
    form.resetFields();
    props.handleClose();
  };
  return (
    <Modal
      visible={props.visible}
      title="パスワードリセット"
      cancelText="キャンセル"
      onOk={onClickOK}
      onCancel={onClickCancel}
    >
      <Form<FormType>
        form={form}
        initialValues={{
          email: "",
        }}
        onFinish={async (values) => {
          try {
            await auth.sendPasswordResetEmail(values.email);
            form.resetFields();
            props.handleClose();
            message.success("パスワードリセットメールの送信に成功しました");
          } catch (e) {
            message.error(messageAuth(e));
          }
        }}
      >
        <Form.Item
          label="メールアドレス"
          name="email"
          rules={[{ required: true, message: "入力が必須です" }]}
        >
          <Input type="email" />
        </Form.Item>
        {/* <Button block type="primary" htmlType="submit">
          送信
        </Button> */}
      </Form>
    </Modal>
  );
}
