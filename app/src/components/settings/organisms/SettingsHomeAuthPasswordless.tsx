import { Button, Form, Input, message, Modal, Popconfirm } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import firebase from "libs/Firebase";
import { messageAuth } from "common/lang";
import AsyncButton from "components/common/atoms/AsyncButton";
import { useForm } from "antd/lib/form/Form";
import { useModal, useQuery } from "hooks/CommonHooks";
import { routeBuilder } from "router";

export default function SettingsHomeAuthPasswordless(props: {
  user: firebase.User;
}) {
  const query = useQuery();

  const modalEmail = useModal();
  const modalRemove = useModal();

  useEffect(() => {
    // デフォルトモーダルを選択
    const modal = query.get("modal");
    if (modal === "mail") {
      modalEmail.handleOpen();
    } else if (modal === "remove") {
      modalRemove.handleOpen();
    }
  }, []);

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
    message.info(
      "認証メールを送信しました。リンク先からメールアドレスを変更してください"
    );
    // const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
    //   props.user.email,
    //   window.location.href
    // );
    // await props.user.reauthenticateWithCredential(credential);
  };

  return (
    <>
      <SeparatedTableStyle>
        <tr>
          <td>
            <Button type="primary" disabled>
              変更
            </Button>
          </td>
          <td>
            <div>パスワードタイプ</div>
            <div>パスワードレス</div>
          </td>
        </tr>
        <tr>
          <td>
            <Popconfirm
              title="再認証用メールを送信します。よろしいでしょうか。"
              onConfirm={handleReauth}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">変更</Button>
            </Popconfirm>
            {/* <Button type="primary" onClick={modalEmail.handleOpen}>
              変更
            </Button> */}
          </td>
          <td>
            <div>メールアドレス</div>
            <div>{`${props.user.email || ""}(${
              props.user.emailVerified ? "確認済み" : "未確認"
            })`}</div>
          </td>
          <td></td>
        </tr>
      </SeparatedTableStyle>
      <UpdateEmailModal
        user={props.user}
        visible={modalEmail.isVisible}
        handleClose={modalEmail.handleClose}
      />
      <RemoveModal
        user={props.user}
        visible={modalRemove.isVisible}
        handleClose={modalRemove.handleClose}
      />
    </>
  );
}

const SeparatedTableStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
});

function UpdateEmailModal(props: {
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
        {/* <Popconfirm
          title="再認証用メールを送信します。よろしいでしょうか。"
          onConfirm={handleReauth}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">再認証メールの送信</Button>
        </Popconfirm> */}
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

function RemoveModal(props: {
  user: firebase.User;
  visible: boolean;
  handleClose: () => void;
}) {
  const onClickCancel = () => {
    props.handleClose();
  };
  const onClickOK = async () => {
    try {
      await props.user.delete();
      message.success("退会が完了しました");
    } catch (e) {
      message.error(messageAuth(e));
    }
  };
  // 再認証後の退会モーダル
  return (
    <Modal
      title="アカウントの削除"
      visible={props.visible}
      onCancel={props.handleClose}
      footer={[
        <Button key="cancel" type="primary" onClick={onClickCancel}>
          キャンセル
        </Button>,
        <Popconfirm
          key="ok"
          title="アカウントを削除します。この操作は取り消せません。"
          onConfirm={onClickOK}
          okText="Yes"
          cancelText="No"
        >
          <AsyncButton type="primary" danger>
            アカウントの削除
          </AsyncButton>
        </Popconfirm>,
      ]}
    >
      アカウントを削除します。この操作は取り消すことができません。よろしければ削除を選択して続行してください。
    </Modal>
  );
}
