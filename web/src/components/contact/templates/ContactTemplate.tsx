import Title from "components/common/atoms/Title";
import SimpleHeader from "components/common/organisms/SimpleHeader";
import React from "react";
import ContactForm from "../organisms/ContactForm";

export default function ContactTemplate() {
  return (
    <>
      <SimpleHeader />
      <Title>問い合わせ</Title>
      <ContactForm />
      {/* <Footer /> */}
    </>
  );
}
