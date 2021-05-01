import { MailTemplate } from "../entities/MailTemplate";
import * as functions from "firebase-functions";
import { MailTemplateDao } from "../repositories/MailTemplates";

export default functions
  .region("asia-northeast1")
  .https.onRequest(async (req, res) => {
    const template: MailTemplate[] = [
      {
        id: "welcome",
        subject: "Subblishへようこそ！",
        text: ["Subblishへようこそ", "{{> footer}}"].join("\n"),
      },
      {
        id: "footer",
        text: "このメールはSubblishから送信されています。",
        partial: true,
      },
      {
        id: "create-contact",
        subject: "[Subblish] 問い合わせを受け付けました",
        text: "問い合わせを受け付けました。",
      },
      {
        id: "email-confirm",
        subject: "[Subblish] メールアドレスを確認しました",
        text: "お客様のメールアドレスを確認しました。",
      }
    ];
    await Promise.all(
      template.map(async (tl) => {
        await MailTemplateDao.set(tl);
      })
    );

    res.status(200).send({
      message: "OK",
    });
  });
