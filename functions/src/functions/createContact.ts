import { Contact } from "../entities/Contact";
import * as functions from "firebase-functions";
import axiosBase from "axios";
import { ContactDao } from "../repositories/Contacts";
import { MailDao } from "../repositories/Mails";

const httpEvent = functions.region("us-central1").https.onCall(async (arg: { data: Contact, token: string}, context) => {
  const contact = arg.data;
  const secret = functions.config().recaptcha.secret;

  const axios = axiosBase.create({
    baseURL: "https://www.google.com",
    responseType: "json"
  });
  // recaptchaの検証を実行
  const params = new URLSearchParams();
  params.append("secret", secret);
  params.append("response", arg.token);

  const verifyResult = await axios.post("/recaptcha/api/siteverify", params);
  const isSuccess: boolean = verifyResult.data.success;
  const action: string | undefined = verifyResult.data.action;

  if (!isSuccess) {
    // recaptchaの検証に失敗
    console.error(verifyResult.data);
    throw new Error("Faild challenge.");
  }

  const result = await ContactDao.add(contact);
  
  let isSentEmail = false;
  try {
    const email = arg.data.email;
    if (!email) {
      throw new Error("email not provided");
    }
    const createdMail = await MailDao.add({
      to: email,
      template: {
        name: "create-contact"
      }
    });
    const AdminMail = await MailDao.add({
      to: "subblish@fastmail.jp", // 通知先のメールアドレス(仮)
      message: {
        subject: "問い合わせがありました",
        text: `問い合わせID:${createdMail}`,
      }
    })
    console.log(`action: ${action} customer: ${createdMail} admin: ${AdminMail}`);
    isSentEmail = true;
  } catch(e) {
    console.error(e);
  }

  return {
    id: result,
    email: isSentEmail,
  };
  // return result?.id;
});
export {httpEvent};
