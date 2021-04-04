import PrivateRoute from "components/wrapper/PrivateRoute";
import React from "react";
import ReportNewTemplate from "../templates/ReportNewTemplate";

export default function ReportNew(){
    return (
        <PrivateRoute>
            <ReportNewTemplate />
        </PrivateRoute>
    )
}