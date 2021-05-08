import { Button } from "antd";
import { useModal } from "hooks/CommonHooks";
import React from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function SignInForgetPassword() {
  const modal = useModal();
  return (
    <>
      <div>
        パスワードを忘れた方は
        <Button type="link" size="large" onClick={modal.handleOpen}>
          こちら
        </Button>
      </div>
      <ResetPasswordForm
        visible={modal.isVisible}
        handleClose={modal.handleClose}
      ></ResetPasswordForm>
    </>
  );
}
