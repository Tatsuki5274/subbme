import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import React from "react";
import styled from "styled-components";
import OSignInForm from "../organisms/SignInForm";
import SignInNewUser from "../organisms/SignInNewUser";
import SignInServices from "../organisms/SignInServices";

export default function SignIn(){

    return (
        <>
            <SimpleHeader/>
            <Title>ログイン</Title>
            <SubTitle>メールアドレスでログイン</SubTitle>
            <OSignInForm />
            <SignInNewUser />
            <SubTitle>サービスでログイン</SubTitle>
            <SignInServices />
            <Footer/>
        </>
    );
}

const SubTitle = styled.div({
    fontSize: "26px",
    color: "#868E96"
})