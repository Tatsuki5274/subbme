import Modal from "antd/lib/modal/Modal";
import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import { useModal } from "hooks/CommonHooks";
import styled from "styled-components";
import SettingsRow from "../molecules/SettingsRow";
import { Form, FormInstance, Input, message } from "antd";
import { useRef } from "react";

type PasswordFormType = {
  newPassword: string;
  newPasswordConfirm: string;
};

export default function SettingsHome() {
  const modalPassword = useModal();
  const updatePasswordFormRef = useRef<FormInstance<PasswordFormType>>(null);
  const minLengthPassword = 7;
  const handleOKUpdatePassword = () => {
    updatePasswordFormRef.current?.submit();
  };
  const onFinishUpdatePassword = (values: PasswordFormType) => {
    if (values.newPassword !== values.newPasswordConfirm) {
      message.error("入力したパスワードが異なります");
      return;
    }
    modalPassword.handleClose();
    console.log("update", values);
  };

  // const credential = firebase.auth.EmailAuthProvider.credential(
  //   currentUser?.email || "",
  //   "currentPassword"
  // );
  // currentUser
  //   ?.reauthenticateWithCredential(credential)
  //   .then(function () {
  //     // User re-authenticated.
  //   })
  //   .catch(function (error) {
  //     // An error happened.
  //     console.error(error);
  //   });

  return (
    <>
      <Title>設定</Title>
      <SubTitle>認証情報</SubTitle>
      <RowsWrapperStyle>
        <SettingsRow label="メールアドレス" value="hoge@subbme.com" disabled />
        <SettingsRow
          onClick={modalPassword.handleOpen}
          label="パスワード"
          value="********"
        />
      </RowsWrapperStyle>
      <div>
        <Modal
          title="パスワード変更"
          visible={modalPassword.isVisible}
          onOk={handleOKUpdatePassword}
          onCancel={modalPassword.handleClose}
          cancelText="キャンセル"
        >
          <Form<PasswordFormType>
            onFinish={onFinishUpdatePassword}
            ref={updatePasswordFormRef}
          >
            <Form.Item
              label="新しいパスワード"
              name="newPassword"
              rules={[
                { required: true, message: "入力してください" },
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
              name="newPasswordConfirm"
              rules={[
                { required: true, message: "入力してください" },
                {
                  min: minLengthPassword,
                  message: `パスワードは最低${minLengthPassword}文字以上必要です`,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}

const RowsWrapperStyle = styled.table({
  borderCollapse: "separate",
  borderSpacing: "15px 0",
  // border-collapse:separate;
});
