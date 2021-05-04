import firebase from "libs/Firebase";
type ErrorType = {
  code: string;
  message: string;
};

export const signUpUser = async (email: string, password: string) => {
  const user = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      user.user?.sendEmailVerification();
    });
  return user;
};

export const signInUser = async (email: string, password: string) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return user;
  } catch (e) {
    return {
      code: e.code,
      message: e.message,
    } as ErrorType;
  }
};

/**
 *
 * @param args email を入力したらemailのユーザーのemailを確認。入力がない場合は認証ユーザーのemailを確認
 * @returns
 */
export async function confirmEmail(args: { email?: string }) {
  const confirmEmail = firebase
    .functions()
    .httpsCallable("onConfirmEmail-httpEvent");
  const result = await confirmEmail(args);
  return result;
}

export const ProvidersEnum = {
  Email: "password",
  Google: "google.com",
} as const;
export type ProvidersType = typeof ProvidersEnum[keyof typeof ProvidersEnum];
