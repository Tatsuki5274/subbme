import PrivateRoute from "components/wrapper/PrivateRoute";
import React from "react";
import SettingsTemplate from "../templates/SettingsTemplate";

export default function Settings() {
  return (
    <PrivateRoute>
      <SettingsTemplate />
    </PrivateRoute>
  );
}
