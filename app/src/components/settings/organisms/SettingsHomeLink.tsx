import React from "react";
import firebase from "libs/Firebase";
import AsyncButton from "components/common/atoms/AsyncButton";
import { Button, Form, Input, message, Modal, Popconfirm, Tabs } from "antd";
import { messageAuth } from "common/lang";
import { useModal } from "hooks/CommonHooks";
import { useForm } from "antd/lib/form/Form";
import styled from "styled-components";
import { useHistory } from "react-router";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "@material-ui/core";
import { ProvidersEnum } from "libs/User";
import { routeBuilder } from "router";

export default function SettingsHomeLink(props: {
  user: firebase.User;
  isProviderEmailLink: boolean;
  isProviderPassword: boolean;
  isProviderGoogle: boolean;
}) {
  const user = props.user;
  const history = useHistory();
  const passwordProviderModal = useModal();
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
      <SeparatedTableStyle>
        <tr>
          <td>
            {props.isProviderEmailLink || props.isProviderPassword ? (
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
            <Tooltip title="メールアドレスで認証を行う仕組みを指しています。パスワードレス認証とパスワード認証から選択することができます。">
              <QuestionCircleOutlined />
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td>
            {props.isProviderGoogle ? (
              <Popconfirm
                title="アカウントの連携を解除しますか？解除するとこのサービスのアカウントを用いてログインすることができなくなります。"
                onConfirm={() => onClickUnlink(ProvidersEnum.Google)}
                okText="Yes"
                cancelText="No"
              >
                <AsyncButton danger>連携解除</AsyncButton>{" "}
              </Popconfirm>
            ) : (
              <AsyncButton type="primary" onClick={onClickGoogle} disabled>
                連携(調整中)
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

/**
 * @description Emailアカウント紐付けモーダル
 */
const PasswordProviderForm = (props: {
  user: firebase.User;
  isVisible: boolean;
  handleClose: () => void;
}) => {
  return (
    <Modal
      visible={props.isVisible}
      title="認証情報の追加"
      onCancel={props.handleClose}
      footer={null}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane key="1" tab="パスワードレス(推奨)">
          <PasswordlessForm user={props.user} handleClose={props.handleClose} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="パスワード">
          <PasswordForm user={props.user} handleClose={props.handleClose} />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

const PasswordlessForm = (props: {
  user: firebase.User;
  handleClose: () => void;
}) => {
  type FormType = {
    email: string;
  };
  const [form] = useForm<FormType>();
  const initialValues: FormType = {
    email: "",
  };
  const onSubmit = async (values: FormType) => {
    try {
      if (!props.user.email) {
        throw new Error("mail is undefined");
      }
      const uri = new URL(window.location.href);
      const origin = uri.origin;
      const actionCodeSettings = {
        url: routeBuilder.settingsPath(origin),
        // url: routeBuilder.mailLink("link", id, origin),
        handleCodeInApp: true,
      };
      await firebase
        .auth()
        .sendSignInLinkToEmail(props.user.email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", props.user.email);
      message.info(
        "認証メールを送信しました。リンク先から連携を確定してください。"
      );
      form.resetFields();
      props.handleClose();
    } catch (e) {
      message.error(messageAuth(e));
      console.error(e);
    }
  };
  const onCancel = () => {
    props.handleClose();
    form.resetFields();
  };
  const onOK = async () => {
    await form.validateFields();
    await onSubmit(form.getFieldsValue());
  };
  return (
    <Form form={form} initialValues={initialValues}>
      <Form.Item
        label="新しいメールアドレス"
        name="email"
        rules={[
          { required: true, message: "入力が必須です" },
          { type: "email", message: "メールアドレスの形式が異なります" },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Button key="cancel" onClick={onCancel}>
        キャンセル
      </Button>
      <AsyncButton key="ok" type="primary" onClick={onOK}>
        OK
      </AsyncButton>
    </Form>
  );
};

/**
 * @description パスワード認証追加フォーム
 */
const PasswordForm = (props: {
  user: firebase.User;
  handleClose: () => void;
}) => {
  type FormType = {
    email: string;
    password: string;
    passwordConfirm: string;
  };
  const [form] = useForm();
  const minLengthPassword = 7;
  const onSubmit = async (values: FormType) => {
    try {
      const credential = firebase.auth.EmailAuthProvider.credential(
        values.email,
        values.password
      );
      await props.user.linkWithCredential(credential);
      await props.user.sendEmailVerification();
      message.success("連携に成功しました");
      form.resetFields();
      props.handleClose();
    } catch (e) {
      message.error(messageAuth(e));
    }
  };
  const onOK = async () => {
    await form.validateFields();
    await onSubmit(form.getFieldsValue());
  };
  const onCancel = () => {
    props.handleClose();
    form.resetFields();
  };

  return (
    <Form form={form}>
      <Form.Item
        label="新しいメールアドレス"
        name="email"
        rules={[
          { required: true, message: "入力が必須です" },
          { type: "email", message: "メールアドレスの形式が異なります" },
        ]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="新しいパスワード"
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
        label="新しいパスワード確認"
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
      <Button key="cancel" onClick={onCancel}>
        キャンセル
      </Button>
      <AsyncButton key="ok" type="primary" onClick={onOK}>
        OK
      </AsyncButton>
    </Form>
  );
};

const SeparatedTableStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
});
