import ContactTemplate from "components/contact/templates/ContactTemplate";
import React from "react";
import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <>
      <Helmet>
        <html lang="ja" />
        <title>Contact | Subbme</title>
        <meta name="description" content="Subbmeについての問い合わせ" />
      </Helmet>
      <ContactTemplate />
    </>
  );
}
