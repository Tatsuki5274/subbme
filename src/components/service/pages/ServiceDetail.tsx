import Result500 from "components/common/organisms/500";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import PrivateRoute from "components/wrapper/PrivateRoute";
import { useGetService } from "hooks/ServiceHooks";
import { convertUnitToDay, convertUnitToString } from "libs/Util";
import ServicedetailTemplate from "../templates/ServiceDetailTemplate";

// const mock = {
//     serviceID: "hogehoge",
//     serviceName: "dropbox",
//     planName: "クラウド",
//     originalPrice: "¥2000/2月",
//     categoryName: "クラウド",
//     detail: "詳細です"
// }

type PropsType = {
    match: {
        params: {
            serviceID: string
        }
    }
}

export default function ServiceDetail(props: PropsType) {
    const serviceID = props.match.params.serviceID;
    const { isLoading, service } = useGetService(serviceID);

    try {

        if (isLoading) {
            return <LoadingScreen />
        }

        if (!service?.id) {
            throw new Error("ドキュメントの取得に失敗しました");
        }
        const cost = (service.costPerDay || 0) * (service.unitTerm || 0) * convertUnitToDay(service.unit);

        const data = {
            serviceID: service.id,
            serviceName: service.serviceName || "",
            planName: service.planName || "",
            originalPrice: `¥${cost.toLocaleString()}/${service.unitTerm}${convertUnitToString(service.unit)}`,
            categoryName: service.categoryName || [],
            detail: service.detail || "",
            isArchived: service.isArchived || false,
        }

        return <PrivateRoute>
            <ServicedetailTemplate
                {...data}
            />
        </PrivateRoute>
    } catch(e) {
        console.error(e);
        return <Result500/>
    }
    // return <ServicedetailTemplate
    //     {...mock}
    // />;
}