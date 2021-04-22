import { useModal } from "hooks/CommonHooks";
import React from "react";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";
import ResetPasswordForm from "./ResetPasswordForm";

export default function SignInNewUser() {
  const modal = useModal();
  return (
    <>
      <div>
        初めてのご利用の方は
        <Link to={routeBuilder.signUpPath()}>こちら</Link>
      </div>
      <div>
        パスワードを忘れた方は
        <span onClick={modal.handleOpen}>こちら</span>
        {/* <Link to={routeBuilder.resetPasword()}>こちら</Link> */}
      </div>
      <ResetPasswordForm
        visible={modal.isVisible}
        handleClose={modal.handleClose}
      ></ResetPasswordForm>
    </>
  );
}
