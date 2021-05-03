import SubTitle from "components/common/atoms/SubTitle";
import React from "react";
import firebase from "libs/Firebase";
import AsyncButton from "components/common/atoms/AsyncButton";
import { Button, Form, Input, message, Modal } from "antd";
import { messageAuth } from "common/lang";
import { useModal } from "hooks/CommonHooks";
import { useForm } from "antd/lib/form/Form";
import styled from "styled-components";
import { useHistory } from "react-router";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "@material-ui/core";

export default function SettingsHomeLink(props: { user: firebase.User }) {
  const user = props.user;
  const history = useHistory();
  const passwordProviderModal = useModal();
  if (!user) {
    return null;
  }
  const passwordProvider =
    user.providerData.find((provider) => {
      return provider?.providerId === "password";
    }) || null;
  // google 認証に関する情報
  const googleProvider =
    user.providerData.find((provider) => {
      return provider?.providerId === "google.com";
    }) || null;
  const onClickUnlink = async (providerId: string) => {
    try {
      if (user.providerData.length <= 1) {
        // providerが1で削除した場合、アカウントを識別する情報がなくなってしまうため
        throw new Error("他の認証情報が存在しません");
      }
      await user.unlink(providerId);
      message.success("解除に成功しました");
      history.go(0);
    } catch (e) {
      message.error(messageAuth(e));
    }
  };

  const onClickGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await user.linkWithPopup(provider);
      message.success("連携に成功しました");
      history.go(0);
    } catch (e) {
      message.error(messageAuth(e));
    }
  };
  return (
    <>
      <SubTitle>アカウント連携</SubTitle>
      <SeparatedTableStyle>
        <tr>
          <td>
            {passwordProvider ? (
              <AsyncButton danger disabled>
                連携解除
              </AsyncButton>
            ) : (
              <AsyncButton
                type="primary"
                onClick={passwordProviderModal.handleOpen}
              >
                連携
              </AsyncButton>
            )}
          </td>
          <td>
            Emailアカウント
            <Tooltip title="メールアドレスとパスワードの組み合わせで認証を行う仕組みを指しています">
              <QuestionCircleOutlined />
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td>
            {googleProvider ? (
              <AsyncButton
                danger
                onClick={() => onClickUnlink(googleProvider.providerId)}
              >
                連携解除
              </AsyncButton>
            ) : (
              <AsyncButton type="primary" onClick={onClickGoogle}>
                連携
              </AsyncButton>
            )}
          </td>
          <td>Googleアカウント</td>
        </tr>
      </SeparatedTableStyle>
      <PasswordProviderForm
        user={props.user}
        handleClose={passwordProviderModal.handleClose}
        isVisible={passwordProviderModal.isVisible}
      />
    </>
  );
}

const PasswordProviderForm = (props: {
  user: firebase.User;
  isVisible: boolean;
  handleClose: () => void;
}) => {
  type FormType = {
    email: string;
    password: string;
    passwordConfirm: string;
  };
  const [form] = useForm();
  const onSubmit = async (values: FormType) => {
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        values.email,
        values.password
      );
      await props.user.linkWithCredential(credential);
      message.success("連携に成功しました");
      form.resetFields();
      props.handleClose();
    } catch (e) {
      message.error(messageAuth(e));
    }
  };
  const onCancel = () => {
    form.resetFields();
    props.handleClose();
  };
  const onOK = async () => {
    await form.validateFields();
    await onSubmit(form.getFieldsValue());
  };
  const minLengthPassword = 7;
  return (
    <Modal
      visible={props.isVisible}
      title="認証情報の追加"
      onOk={onOK}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          キャンセル
        </Button>,
        <AsyncButton key="ok" type="primary" onClick={onOK}>
          OK
        </AsyncButton>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          label="メールアドレス"
          name="email"
          rules={[
            { required: true, message: "入力が必須です" },
            { type: "email", message: "メールアドレスの形式が異なります" },
          ]}
        >
          <Input type="email" />
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
      </Form>
    </Modal>
  );
};

const SeparatedTableStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
});
