import { Button, Form, Input } from "antd";
import { auth } from "libs/Types";
import React from "react";

export default function ActionResetPassword(props: {
  actionCode: string;
  continueUrl: string | null;
  lang: string;
}) {
  const handleReset = async () => {
    const accountEmail = await auth.verifyPasswordResetCode(props.actionCode);
  };
  return (
    <Form>
      <Form.Item label="新しいパスワード" name="newPassword">
        <Input.Password />
      </Form.Item>
      <Button block type="primary" htmlType="submit">
        変更
      </Button>
    </Form>
  );
}
