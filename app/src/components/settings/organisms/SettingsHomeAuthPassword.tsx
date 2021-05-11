import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import firebase from "libs/Firebase";
import styled from "styled-components";
import { useForm } from "antd/lib/form/Form";
import { messageAuth } from "common/lang";
import AsyncButton from "components/common/atoms/AsyncButton";
import { useModal } from "hooks/CommonHooks";
import { resendEmailVerification } from "./SettingsHome";

export default function SettingsHomeAuthPassword(props: {
  user: firebase.User;
}) {
  const modalPassword = useModal();
  const modalEmail = useModal();
  return (
    <>
      <SeparatedTableStyle>
        <tr>
          <td>
            <Button type="primary" onClick={modalEmail.handleOpen}>
              変更
            </Button>
          </td>
          <td>
            <div>メールアドレス</div>
            <div>
              {props.user.email || ""}
              {props.user.emailVerified ? (
                <span>確認済み</span>
              ) : (
                <AsyncButton
                  type="link"
                  onClick={async () =>
                    await resendEmailVerification(props.user)
                  }
                >
                  確認メール再送信
                </AsyncButton>
              )}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <Button type="primary" onClick={modalPassword.handleOpen}>
              変更
            </Button>
          </td>
          <td>パスワード</td>
          <td>********</td>
        </tr>
      </SeparatedTableStyle>
      <SettingsUpdateEmail
        user={props.user}
        visible={modalEmail.isVisible}
        handleClose={modalEmail.handleClose}
      />
    </>
  );
}

const SeparatedTableStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});

function SettingsUpdateEmail(props: {
  user: firebase.User;
  visible: boolean;
  handleClose: () => void;
}) {
  // メールアドレス変更フォームの型
  type FormFieldType = {
    currentPassword: string;
    newEmail: string;
  };
  const [form] = useForm<FormFieldType>();
  const handleOK = async () => {
    await form.validateFields();
    await handleSubmit(form.getFieldsValue());
  };
  const handleCancel = () => {
    form.resetFields();
    props.handleClose();
  };
  const handleSubmit = async (values: FormFieldType) => {
    if (!props.user.email) {
      // ユーザーのemailが取得できない場合
      throw new Error("User is not signedin.");
    }
    const credential = firebase.auth.EmailAuthProvider.credential(
      props.user.email,
      values.currentPassword
    );
    try {
      await props.user.reauthenticateWithCredential(credential);
      await props.user.updateEmail(values.newEmail);
      await props.user.sendEmailVerification();
      message.success("パスワードの変更が成功しました");
      form.resetFields();
      props.handleClose();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e.message, e.code);
      message.warn(messageAuth(e));
    }
  };

  return (
    <Modal
      title="メールアドレス変更"
      onOk={handleOK}
      onCancel={handleCancel}
      visible={props.visible}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          キャンセル
        </Button>,
        <AsyncButton key="ok" type="primary" onClick={handleOK}>
          OK
        </AsyncButton>,
      ]}
    >
      <Form<FormFieldType> form={form}>
        <Form.Item
          label="現在のパスワード"
          name="currentPassword"
          rules={[{ required: true, message: "入力してください" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="変更後のメールアドレス"
          name="newEmail"
          rules={[
            { required: true, message: "入力してください" },
            {
              type: "email",
              message: "正しい形式で入力してください",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
