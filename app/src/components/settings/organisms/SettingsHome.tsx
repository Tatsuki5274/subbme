import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import SubTitle from "components/common/atoms/SubTitle";
import Title from "components/common/atoms/Title";
import { useModal } from "hooks/CommonHooks";
import { useUser } from "hooks/UserHooks";
import styled from "styled-components";
import SettingsRow from "../molecules/SettingsRow";
import firebase from "libs/Firebase";

type PasswordFormType = {
  newPassword: string;
};

export default function SettingsHome() {
  const { currentUser } = useUser();
  const modalPassword = useModal();
  const handleOKUpdatePassword = () => {
    modalPassword.handleClose();
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
          {/* <Form onFinish={}></Form> */}
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
