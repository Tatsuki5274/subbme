import { Form, Input, Button, message, Checkbox } from "antd";
import { formLayout } from "common/styles";
import { useHistory } from "react-router";
import { signUpUser } from "libs/User";
import { routeBuilder } from "router";
import React from "react";
import { messageAuth } from "common/lang";

type FormType = {
  email: string;
  password: string;
  passwordConfirm: string;
  isAgreePrivacyPolicy: boolean;
  isAdMail: boolean;
};

export default function SignUpForm() {
  const history = useHistory();
  const onFinish = async (values: FormType) => {
    try {
      await signUpUser(values.email, values.password);
      message.success("ログインに成功しました");
      history.push(routeBuilder.topPath());
    } catch (e) {
      message.error(messageAuth(e));
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };
  const minLengthPassword = 7;
  const initialValues: FormType = {
    email: "",
    password: "",
    passwordConfirm: "",
    isAgreePrivacyPolicy: false,
    isAdMail: true,
  };

  return (
    <Form
      {...formLayout}
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
      <Form.Item
        label="パスワード"
        name="password"
        rules={[
          { required: true, message: "入力が必須です" },
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
        name="passwordConfirm"
        rules={[
          { required: true, message: "入力が必須です" },
          {
            min: minLengthPassword,
            message: `パスワードは最低${minLengthPassword}文字以上必要です`,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (value === getFieldValue("password")) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("パスワードが異なります"));
            },
          }),
        ]}
      >
        <Input.Password />
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
          新規登録
        </Button>
      </Form.Item>
    </Form>
  );
}
