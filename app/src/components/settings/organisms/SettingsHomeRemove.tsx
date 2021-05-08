import { FrownOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, message, Modal, Radio, Tabs } from "antd";
import { useForm } from "antd/lib/form/Form";
import AsyncButton from "components/common/atoms/AsyncButton";
import React from "react";
import firebase from "libs/Firebase";
import { messageAuth } from "common/lang";
import { ProvidersEnum } from "libs/User";
import { useHistory } from "react-router";
import { routeBuilder } from "router";

/**
 * @description 退会モーダル
 */
export default function SettingsHomeRemove(props: {
  user: firebase.User;
  visible: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      title="アカウントの削除"
      visible={props.visible}
      onCancel={props.handleClose}
      // onOk={onClickOK}
      // footer={[
      //   <Button key="cancel">キャンセル</Button>,
      //   <AsyncButton key="ok" type="primary" danger>
      //     退会
      //   </AsyncButton>,
      // ]}
      footer={null}
    >
      <p>設定済みの認証方法から選択してください</p>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="パスワードレス" key="1">
          <PasswordlessForm user={props.user} handleClose={props.handleClose} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="パスワード" key="2">
          <PasswordForm user={props.user} handleClose={props.handleClose} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Google" key="3">
          <GoogleForm user={props.user} handleClose={props.handleClose} />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

function PasswordForm(props: { user: firebase.User; handleClose: () => void }) {
  type FormType = {
    password: string;
  };
  const history = useHistory();
  const [form] = useForm<FormType>();
  const initialValues: FormType = {
    password: "",
  };
  const onClickRemove = async (values: FormType) => {
    try {
      if (!props.user.email) {
        throw new Error("メールアドレスが設定されていません");
      }
      const credential = firebase.auth.EmailAuthProvider.credential(
        props.user.email,
        values.password
      );
      await props.user.reauthenticateWithCredential(credential);

      await props.user.delete();
      props.handleClose();
      form.resetFields();
      history.push(routeBuilder.signInPath());
      message.success("退会処理が完了しました");
    } catch (e) {
      message.error(messageAuth(e));
    }
  };
  const onClickOK = async () => {
    await form.validateFields();
    await onClickRemove(form.getFieldsValue());
  };
  const onClickCancel = () => {
    props.handleClose();
    form.resetFields();
  };

  return (
    <Form initialValues={initialValues} form={form}>
      <Alert
        icon={<FrownOutlined />}
        message="警告"
        description="アカウントの全ての情報を削除します。この操作は取り消すことができません。現在のパスワードを入力して削除を実行してください。"
        type="error"
        showIcon
      />
      <Form.Item label="現在のパスワード" name="password">
        <Input type="password" />
      </Form.Item>
      <Button key="cancel" onClick={onClickCancel}>
        キャンセル
      </Button>
      <AsyncButton key="ok" type="primary" danger onClick={onClickOK}>
        退会
      </AsyncButton>
    </Form>
  );
}

function PasswordlessForm(props: {
  user: firebase.User;
  handleClose: () => void;
}) {
  const onClickCancel = () => {
    props.handleClose();
  };
  const onClickOK = async () => {
    if (!props.user.email) {
      // ユーザーのemailが取得できない場合
      throw new Error("User is not signedin.");
    }
    const uri = new URL(window.location.href);
    const origin = uri.origin;
    const actionCodeSettings = {
      url: routeBuilder.settingsPath(origin) + "?modal=remove",
      handleCodeInApp: true,
    };
    await firebase
      .auth()
      .sendSignInLinkToEmail(props.user.email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", props.user.email);
    message.info(
      "認証メールを送信しました。リンク先からメールアドレスを変更してください"
    );
  };
  return (
    <>
      <Alert
        icon={<FrownOutlined />}
        message="注意"
        description="アカウントの削除をするために確認メールを送信します。この操作ではアカウントは削除されません。"
        type="warning"
        showIcon
      />
      <Button key="cancel" onClick={onClickCancel}>
        キャンセル
      </Button>
      <AsyncButton key="ok" type="default" danger onClick={onClickOK}>
        退会確認メール送信
      </AsyncButton>
    </>
  );
}

function GoogleForm(props: { user: firebase.User; handleClose: () => void }) {
  const history = useHistory();
  const onClickCancel = () => {
    props.handleClose();
  };
  const onClickOK = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await props.user.reauthenticateWithPopup(provider);
    await props.user.delete();
    props.handleClose();
    history.push(routeBuilder.signInPath());
    message.success("退会処理が完了しました");
  };
  return (
    <>
      <Alert
        icon={<FrownOutlined />}
        message="警告"
        description="Googleアカウントの認証を行います。認証完了後は確認無しでアカウントが削除されます。"
        type="error"
        showIcon
      />
      <Button key="cancel" onClick={onClickCancel}>
        キャンセル
      </Button>
      <AsyncButton key="ok" type="primary" danger onClick={onClickOK}>
        退会
      </AsyncButton>
    </>
  );
}
