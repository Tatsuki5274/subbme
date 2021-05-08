import { Form, Input, Button, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import firebase from "libs/Firebase";
import { messageAuth } from "common/lang";

type FormType = {
  email: string;
};

export default function SignInPasswordlessForm() {
  const [form] = useForm<FormType>();
  const initialValues: FormType = {
    email: "",
  };
  const onFinish = async (values: FormType) => {
    try {
      const uri = new URL(window.location.href);
      const origin = uri.origin;
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: origin,
        // This must be true.
        handleCodeInApp: true,
        // iOS: {
        //   bundleId: "com.example.ios",
        // },
        // android: {
        //   packageName: "com.example.android",
        //   installApp: true,
        //   minimumVersion: "12",
        // },
        // dynamicLinkDomain: "example.page.link",
      };
      const email: string = values.email;
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      message.success("認証メールを送信しました");
      form.resetFields();
    } catch (e) {
      message.error(messageAuth(e));
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };
  return (
    <Form
      form={form}
      name="singin"
      initialValues={initialValues}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="メールアドレス"
        name="email"
        rules={[
          { required: true, message: "入力が必須です" },
          { type: "email", message: "正しい形式で入力してください" },
        ]}
        tooltip="アカウントを作成済み場合は、ログインを行います。未作成の場合はアカウントを作成します。認証時は登録メールアドレス宛に認証リクエストが送信されます。パスワードの登録は必要ありません。"
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          認証送信
        </Button>
      </Form.Item>
    </Form>
  );
}
