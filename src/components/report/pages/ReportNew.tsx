import LoadingScreen from "components/common/organisms/LoadingScreen";
import PrivateRoute from "components/wrapper/PrivateRoute";
import { useListService } from "hooks/ServiceHooks";
import { useUser } from "hooks/UserHooks";
import React from "react";
import ReportNewTemplate from "../templates/ReportNewTemplate";

// const mock = [
//     {
//         id: "1",
//         costPerDay: 50,
//         serviceName: "OO保険",
//         categoryName: "保険"
//     },
//     {
//         id: "2",
//         costPerDay: 20,
//         serviceName: "Onedrive",
//         categoryName: "クラウドストレージ"
//     },
//     {
//         id: "3",
//         costPerDay: 100,
//         serviceName: "Dropbox",
//         categoryName: "クラウドストレージ"
//     },
//     {
//         id: "4",
//         costPerDay: 150,
//         serviceName: "Netflix",
//         categoryName: "動画オンデマンド"
//     }
// ];

export default function ReportNew(){

    const { currentUser } = useUser();
    const { serviceList } = useListService(currentUser?.uid)

    if (!serviceList) {
        return <LoadingScreen />
    }

    return (
        <PrivateRoute>
            <ReportNewTemplate
                services={serviceList}
            />
        </PrivateRoute>
    )
}