import { FrownOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Form,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import AsyncButton from "components/common/atoms/AsyncButton";
import React, { useState } from "react";
import firebase from "libs/Firebase";
import { messageAuth } from "common/lang";
import { ProvidersEnum } from "libs/User";

/**
 * @description 退会モーダル
 */
export default function SettingsHomeRemove(props: {
  user: firebase.User;
  visible: boolean;
  handleClose: () => void;
}) {
  type FormType = {
    providerId: string;
    password: string;
  };
  const [form] = useForm<FormType>();
  const [isEmailProvider, setIsEmailProvider] = useState(true);
  const initialValues: FormType = {
    providerId: ProvidersEnum.Email,
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
      if (values.providerId === ProvidersEnum.Email) {
        // Emailアカウント認証の場合
        await props.user.reauthenticateWithCredential(credential);
      } else if (values.providerId === ProvidersEnum.Google) {
        // Googleアカウント認証の場合
        const provider = new firebase.auth.GoogleAuthProvider();
        await props.user.reauthenticateWithPopup(provider);
      } else {
        // 存在しないProviderの場合
        throw new Error("不明な認証プロバイダーが選択されています");
      }
      await props.user.delete();
      props.handleClose();
      form.resetFields();
      setIsEmailProvider(true);
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
  /**
   * @description 退会に使う認証プロバイダーを変更した場合の処理
   */
  const onChangeProvider = (event: RadioChangeEvent) => {
    const value = event.target.value;
    const isEmail = value === ProvidersEnum.Email;
    if (!isEmail) {
      // Emailアカウント以外を設定した場合はフォームを削除する
      form.setFieldsValue({ password: "" });
    }
    setIsEmailProvider(isEmail);
  };
  return (
    <Modal
      title="アカウントの削除"
      visible={props.visible}
      onCancel={props.handleClose}
      onOk={onClickOK}
      footer={[
        <Button key="cancel" onClick={onClickCancel}>
          キャンセル
        </Button>,
        <AsyncButton key="ok" type="primary" danger onClick={onClickOK}>
          退会
        </AsyncButton>,
      ]}
    >
      <Alert
        icon={<FrownOutlined />}
        message="警告"
        description="アカウントの全ての情報を削除します。この操作は取り消すことができません。現在のパスワードを入力して削除を実行してください。"
        type="error"
        showIcon
      />
      <Form initialValues={initialValues} form={form}>
        <Form.Item name="providerId" label="認証プロバイダー">
          <Radio.Group onChange={onChangeProvider}>
            <Radio value={ProvidersEnum.Email}>Emailアカウント</Radio>
            <Radio value={ProvidersEnum.Google}>Google</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="現在のパスワード" name="password">
          <Input type="password" disabled={!isEmailProvider} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
