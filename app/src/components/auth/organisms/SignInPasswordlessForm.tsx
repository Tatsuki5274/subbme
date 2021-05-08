import { Form, Input, Button, message, Checkbox, Alert } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import firebase from "libs/Firebase";
import { messageAuth } from "common/lang";
import { routeBuilder } from "router";

type FormType = {
  email: string;
  isAgreePrivacyPolicy: boolean;
};

export default function SignInPasswordlessForm() {
  const [form] = useForm<FormType>();
  // const agreement = localStorage.getItem("policyAgreement");
  const initialValues: FormType = {
    email: "",
    isAgreePrivacyPolicy: true,
  };
  const onFinish = async (values: FormType) => {
    try {
      // localStorage.setItem("policyAgreement", "true");
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
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label={
          <>
            <a
              target="_blank"
              href={routeBuilder.privacyPolicyPath()}
              rel="noreferrer"
            >
              プライバシーポリシ
            </a>
            に同意する
          </>
        }
        name="isAgreePrivacyPolicy"
        valuePropName="checked"
        rules={[
          () => ({
            validator(_, value) {
              if (value === true) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("プライバシーポリシへの同意が必要です")
              );
            },
          }),
        ]}
      >
        <Checkbox />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          ログイン
        </Button>
      </Form.Item>
      <Alert
        type="info"
        message="Googleアカウントでログインしたい方はサービス認証を選択してください"
      />
    </Form>
  );
}
