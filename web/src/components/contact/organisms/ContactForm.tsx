import React from "react";
import firebase from "libs/Firebase";

export default function ContactForm() {
  const onSubmit = async () => {
    const CreateContact = firebase
      .functions()
      .httpsCallable("createContact-httpEvent");
    const result = await CreateContact();
    console.log(result);
  };
  return (
    <>
      <span>form</span>
      <button onClick={onSubmit}>button</button>
    </>
  );
}
