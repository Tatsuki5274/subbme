import firebase from "libs/Firebase";

const analytics = firebase.analytics();

export const logEvents = {
  signUp: (method: "email" | "google") => {
    const name = "sign_up";
    analytics.logEvent(name, {
      method: method,
    });
  },
  signIn: (method: "email" | "google") => {
    const name = "sign_in";
    analytics.logEvent(name, {
      method: method,
    });
  },
  tutorialBegin: () => {
    const name = "tutorial_begin";
    analytics.logEvent(name);
  },
};
