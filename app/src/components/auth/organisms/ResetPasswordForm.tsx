import { Button, Form, Input, message } from "antd";
import React from "react";
import { auth } from "libs/Types";

type FormType = {
  email: string;
};

export default function ResetPasswordForm() {
  return (
    <Form<FormType>
      initialValues={{
        email: "",
      }}
      onFinish={async (values) => {
        try {
          await auth.sendPasswordResetEmail(values.email);
          message.success("パスワードリセットメールの送信に成功しました");
        } catch (e) {
          message.error("メールの送信に失敗しました");
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
      <Button block type="primary" htmlType="submit">
        送信
      </Button>
    </Form>
  );
}
