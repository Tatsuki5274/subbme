import React, { useEffect, useState } from "react";
import { ContactManager } from "libs/Backend";
import { useForm } from "antd/lib/form/Form";
import { Form, Input, message, Select } from "antd";
import AsyncButton from "components/common/atoms/AsyncButton";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

type FormType = {
  title: string;
  category: string;
  body: string;
  email: string;
};

function useChallenge() {
  const [token, setToken] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  // if (executeRecaptcha) {
  //   const token = await executeRecaptcha("contact");
  //   console.log("token", token);
  //   // setToken(token);
  // }
  useEffect(() => {
    const fn = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha("contact");
        setToken(token);
      }
    };
    fn();
  }, [executeRecaptcha]);
  return {
    token,
  };
}

export default function ContactForm() {
  // const [token, setToken] = useState<string | null>(null);

  const siteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY || "";
  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      {/* <GoogleReCaptcha
        onVerify={(token) => {
          setToken(token);
          // console.log("token", token);
        }}
      /> */}
      <FormComponent />
    </GoogleReCaptchaProvider>
  );
}

function FormComponent() {
  const [form] = useForm<FormType>();
  const { token } = useChallenge();

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      if (!token) {
        throw new Error("Can't get token");
      }
      const result = await ContactManager.create(
        {
          title: values.title,
          category: values.category,
          body: values.body,
          email: values.email,
        },
        token
      );
      form.resetFields();
      console.log(result);
    } catch (e) {
      message.error("送信に失敗しました");
    }
  };
  const initialValues: FormType = {
    title: "",
    category: "general",
    body: "",
    email: "",
  };
  return (
    <Form<FormType> form={form} initialValues={initialValues}>
      <Form.Item
        label="件名"
        name="title"
        rules={[{ required: true, message: "入力してください" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="メールアドレス"
        name="email"
        rules={[
          { required: true, message: "入力してください" },
          { type: "email", message: "正しい形式で入力してください" },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="カテゴリ"
        name="category"
        rules={[{ required: true, message: "入力してください" }]}
      >
        <Select disabled>
          <Select.Option value="general">一般的な問い合わせ</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="本文"
        name="body"
        rules={[{ required: true, message: "入力してください" }]}
      >
        <Input.TextArea />
      </Form.Item>
      {/* <ReCAPTCHA sitekey={siteKey} onChange={(e) => console.log(e)} /> */}
      <AsyncButton type="primary" onClick={onSubmit}>
        送信
      </AsyncButton>
    </Form>
  );
}
