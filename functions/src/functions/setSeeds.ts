import { MailTemplate } from "../entities/MailTemplate";
import * as functions from "firebase-functions";
import { MailTemplateManager } from "../repositories/MailTemplates";

export default functions
  .region("asia-northeast1")
  .https.onRequest(async (req, res) => {
    const templateManager = new MailTemplateManager();
    const template: MailTemplate[] = [
      {
        id: "welcome",
        subject: "Subbmeへようこそ！",
        text: ["subbmeへようこそ", "{{> footer}}"].join("\n"),
      },
      {
        id: "footer",
        text: "このメールはSubbmeから送信されています。",
        partial: true,
      },
    ];
    await Promise.all(
      template.map(async (tl) => {
        await templateManager.set(tl);
      })
    );

    res.status(200).send({
      message: "OK",
    });
  });
