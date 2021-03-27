import Title from "components/common/atoms/Title";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import React from "react";
import styled from "styled-components";
import SignInServices from "../organisms/SignInServices";
import OSignUpForm from "../organisms/SignUpForm";
import SignUpRegistUser from "../organisms/SignUpRegistUser";

export default function SignUp(){
    return (
        <>
            <SimpleHeader/>
            <Title>新規登録</Title>
            <SubTitle>メールアドレスで登録</SubTitle>
            <OSignUpForm />
            <SignUpRegistUser />
            <SubTitle>サービスでログイン</SubTitle>
            <SignInServices />
        </>
    )
}

const SubTitle = styled.div({
    fontSize: "26px",
    color: "#868E96"
})