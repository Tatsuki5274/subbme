import { signInUser } from "libs/User";
import { Form, Input, Button, message, Checkbox } from "antd";
import { routeBuilder } from "router";
import { useHistory } from "react-router";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { Link } from "react-router-dom";

type FormType = {
  email: string;
  password: string;
  isAgreePrivacyPolicy: boolean;
};

export default function SingInForm() {
  const history = useHistory();
  const [form] = useForm<FormType>();
  const initialValues: FormType = {
    email: "",
    password: "",
    isAgreePrivacyPolicy: false,
  };
  const onFinish = async (values: FormType) => {
    signInUser(values.email, values.password)
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
        rules={[{ required: true, message: "入力が必須です" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="パスワード"
        name="password"
        rules={[{ required: true, message: "入力が必須です" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label={
          <>
            <a href={routeBuilder.privacyPolicyPath()}>プライバシーポリシ</a>
            に同意する
          </>
        }
        name="isAgreePrivacyPolicy"
        valuePropName="checked"
        // validateStatus={isAgree ? "success" : "error"}
        // help="プライバシーポリシへの同意が必要です"
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
    </Form>
  );
}
