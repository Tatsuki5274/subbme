import SettingsTemplate from "../templates/SettingsTemplate";
import firebase from "libs/Firebase";

export default function Settings() {
  const analytics = firebase.analytics();
  analytics.logEvent("test2");
  console.log(analytics);
  return <SettingsTemplate />;
}
