import { Button, Checkbox, Form, message, Radio } from "antd";
import { useForm } from "antd/lib/form/Form";
import firebase from "libs/Firebase";
import React from "react";
import { useHistory } from "react-router";
import { routeBuilder } from "router";
import ServiceGoogle from "../molecules/ServiceGoogle";

export default function SignInServices() {
  type FormType = {
    provider: string;
    isAgreePrivacyPolicy: boolean;
  };
  const history = useHistory();
  const [form] = useForm<FormType>();
  const initialValues: FormType = {
    provider: "google",
    isAgreePrivacyPolicy: true,
  };
  const google = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();

    firebase
      .auth()
      .signInWithPopup(provider)
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
  const onFinish = (values: FormType) => {
    switch (values.provider) {
      case "google":
        google();
        break;
      default:
        throw new Error("不明なプロバイダーが選択されています");
    }
  };
  return (
    <Form form={form} onFinish={onFinish} initialValues={initialValues}>
      <Radio.Group name="provider">
        <Radio value="google">
          <ServiceGoogle />
        </Radio>
      </Radio.Group>
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
      <div>
        <Button type="primary">ログイン</Button>
      </div>
    </Form>
  );
}
