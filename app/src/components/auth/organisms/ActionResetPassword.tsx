import { Button, Form, Input, message } from "antd";
import { messageAuth } from "common/lang";
import { auth } from "libs/Types";
import React from "react";

type PasswordFormType = {
  newPassword: string;
  newPasswordConfirm: string;
};

export default function ActionResetPassword(props: {
  actionCode: string;
  continueUrl: string | null;
  lang: string;
}) {
  const minLengthPassword = 7;
  const handleReset = async (values: PasswordFormType) => {
    try {
      if (values.newPassword !== values.newPasswordConfirm) {
        message.error("パスワードが異なっています");
        return;
      }
      const accountEmail = await auth.verifyPasswordResetCode(props.actionCode);
      if (accountEmail) {
        // アカウントの検証に成功
        await auth.confirmPasswordReset(props.actionCode, values.newPassword);
        message.success("パスワードの更新に成功しました");
        if (props.continueUrl) {
          // history.push(props.continueUrl);
          location.href = props.continueUrl;
        }
      } else {
        // 確認コードの間違いなどにより、検証に失敗
        message.error("アカウントの検証に失敗しました");
      }
    } catch (e) {
      if (e.code) {
        message.error(messageAuth(e));
      }
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };
  return (
    <Form<PasswordFormType> onFinish={handleReset}>
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
      <Button block type="primary" htmlType="submit">
        変更
      </Button>
    </Form>
  );
}
