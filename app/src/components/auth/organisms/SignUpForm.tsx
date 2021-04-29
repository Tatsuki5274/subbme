import { Form, Input, Button, message, Checkbox } from "antd";
import { formLayout } from "common/styles";
import { useHistory } from "react-router";
import { signUpUser } from "libs/User";
import { routeBuilder } from "router";
import React from "react";

type FormType = {
  email: string;
  password: string;
  passwordConfirm: string;
  isAgreePrivacyPolicy: boolean;
};

export default function SignUpForm() {
  const history = useHistory();
  const onFinish = async (values: FormType) => {
    signUpUser(values.email, values.password)
      .then(() => {
        message.success("ログインに成功しました");
        history.push(routeBuilder.topPath());
      })
      .catch((reason) => {
        message.error("ログインに失敗しました");
        // eslint-disable-next-line no-console
        console.error(reason);
      });
  };
  const minLengthPassword = 7;

  return (
    <Form
      {...formLayout}
      name="signup"
      onFinish={onFinish}
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
