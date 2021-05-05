import { Alert, Button, Form, Input, message, Modal, Popconfirm } from "antd";
import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import React from "react";
import styled from "styled-components";
import firebase from "libs/Firebase";
import { messageAuth } from "common/lang";
import AsyncButton from "components/common/atoms/AsyncButton";
import { useForm } from "antd/lib/form/Form";
import { useModal } from "hooks/CommonHooks";
import { routeBuilder } from "router";

export default function SettingsHomeAuthPasswordless(props: {
  user: firebase.User;
}) {
  const modalEmail = useModal();
  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <SeparatedTableStyle>
        <tr>
          <td>
            <Button type="primary" onClick={modalEmail.handleOpen}>
              変更
            </Button>
          </td>
          <td>メールアドレス</td>
          <td>{`${props.user.email || ""}(${
            props.user.emailVerified ? "確認済み" : "未確認"
          })`}</td>
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
});

function SettingsUpdateEmail(props: {
  user: firebase.User;
  visible: boolean;
  handleClose: () => void;
}) {
  // メールアドレス変更フォームの型
  type FormFieldType = {
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
  const handleReauth = async () => {
    if (!props.user.email) {
      // ユーザーのemailが取得できない場合
      throw new Error("User is not signedin.");
    }
    const uri = new URL(window.location.href);
    const origin = uri.origin;
    const actionCodeSettings = {
      url: routeBuilder.settingsPath(origin) + "?modal=mail",
      handleCodeInApp: true,
    };
    await firebase
      .auth()
      .sendSignInLinkToEmail(props.user.email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", props.user.email);
    // const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
    //   props.user.email,
    //   window.location.href
    // );
    // await props.user.reauthenticateWithCredential(credential);
  };
  const handleSubmit = async (values: FormFieldType) => {
    try {
      await props.user.updateEmail(values.newEmail);
      await props.user.sendEmailVerification();
      message.success("メールアドレスの変更が成功しました");
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
        <Popconfirm
          title="再認証用メールを送信します。よろしいでしょうか。"
          onConfirm={handleReauth}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">再認証メールの送信</Button>
        </Popconfirm>
      </Form>
    </Modal>
  );
}
