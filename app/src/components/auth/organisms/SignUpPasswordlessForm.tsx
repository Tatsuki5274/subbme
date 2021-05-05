import { Form, Input, Button, message, Checkbox } from "antd";
import { formLayout } from "common/styles";
import { routeBuilder } from "router";
import React from "react";
import { messageAuth } from "common/lang";
import { useForm } from "antd/lib/form/Form";
import firebase from "libs/Firebase";

type FormType = {
  email: string;
  isAgreePrivacyPolicy: boolean;
  isAdMail: boolean;
};

export default function SignUpPasswordlessForm() {
  const [form] = useForm<FormType>();
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
  const initialValues: FormType = {
    email: "",
    isAgreePrivacyPolicy: false,
    isAdMail: true,
  };

  return (
    <Form
      {...formLayout}
      form={form}
      name="signup"
      onFinish={onFinish}
      initialValues={initialValues}
      // onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="メールアドレス"
        name="email"
        rules={[
          { required: true, message: "入力が必須です" },
          { type: "email", message: "メールアドレスの形式が異なります" },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label="サービスに関するお得な情報を受け取る"
        name="isAdMail"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item> */}
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
          登録送信
        </Button>
      </Form.Item>
    </Form>
  );
}
