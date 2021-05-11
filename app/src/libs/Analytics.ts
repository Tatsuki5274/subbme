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

export const logDocument = {
  read: (type: string, data: unknown[]) => {
    const name = "get_document";
    const params = {
      type: type,
      count: data.length,
    };
    analytics.logEvent(name, params);
  },
  write: (type: string) => {
    const name = "write_document";
    const params = {
      type: type,
      count: 1,
    };
    analytics.logEvent(name, params);
  },
  delete: (type: string) => {
    const name = "delete_document";
    const params = {
      type: type,
      count: 1,
    };
    analytics.logEvent(name, params);
  },
};
