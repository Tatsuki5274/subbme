import React from "react";
import { ContactManager } from "libs/Backend";
import { useForm } from "antd/lib/form/Form";
import { Form, Input, message, Select } from "antd";
import AsyncButton from "components/common/atoms/AsyncButton";
import ReCAPTCHA from "react-google-recaptcha";

type FormType = {
  title: string;
  category: string;
  body: string;
  email: string;
};

export default function ContactForm() {
  const [form] = useForm<FormType>();
  const onSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const result = await ContactManager.create({
        title: values.title,
        category: values.category,
        body: values.body,
        email: values.email,
      });
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
  const siteKey = process.env.GATSBY_RECAPTCHA_SITE_KEY || "";
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
      <ReCAPTCHA sitekey={siteKey} onChange={(e) => console.log(e)} />
      <AsyncButton type="primary" onClick={onSubmit}>
        送信
      </AsyncButton>
    </Form>
  );
}
