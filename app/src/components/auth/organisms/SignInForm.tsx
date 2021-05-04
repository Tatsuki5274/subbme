import { signInUser } from "libs/User";
import { Form, Input, Button, message } from "antd";
import { routeBuilder } from "router";
import { useHistory } from "react-router";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { logEvents } from "libs/Analytics";

type FormType = {
  email: string;
  password: string;
};

export default function SingInForm() {
  const history = useHistory();
  const [form] = useForm<FormType>();
  const initialValues: FormType = {
    email: "",
    password: "",
  };
  const onFinish = async (values: FormType) => {
    signInUser(values.email, values.password)
      .then(() => {
        message.success("ログインに成功しました");
        logEvents.signIn("email");
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          ログイン
        </Button>
      </Form.Item>
    </Form>
  );
}
