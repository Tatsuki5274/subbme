import Title from "components/common/atoms/Title";
import React from "react";
import styled from "styled-components";
import OSignInForm from "../organisms/SignInForm";
import SignInNewUser from "../organisms/SignInNewUser";

export default function SignIn(){

    return (
        <>
            <Title>ログイン</Title>
            <SubTitle>メールアドレスでログイン</SubTitle>
            <OSignInForm />
            <SignInNewUser />
        </>
    );
}

const SubTitle = styled.div({
    fontSize: "26px",
    color: "#868E96"
})