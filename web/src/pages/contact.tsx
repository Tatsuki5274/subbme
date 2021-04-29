import ContactTemplate from "components/contact/templates/ContactTemplate";
import React from "react";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <>
      <Helmet>
        <html lang="ja" />
        <title>Contact | Subbny</title>
        <meta name="description" content="Subbnyについての問い合わせ" />
      </Helmet>
      <ContactTemplate />
    </>
  );
}
