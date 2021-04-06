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
    const {isLoading, service} = useGetService(serviceID);

    console.log(service)

    if (isLoading) {
        return <LoadingScreen />
    }

    if (!service?.id) {
        throw new Error("必須属性が存在しません");
    }
    const cost = (service.costPerDay || 0) * (service.unitTerm || 0) * convertUnitToDay(service.unit);

    const data = {
        serviceID: service.id,
        serviceName: service.serviceName || "",
        planName: service.planName || "",
        // originalPrice: "¥2000/2月",
        originalPrice: `¥${cost.toLocaleString()}/${service.unitTerm}${convertUnitToString(service.unit)}`,
        categoryName: service.categoryName || "",
        detail: service.detail || "",
        isArchived: service.isArchived || false,
    }

    return <PrivateRoute>
        <ServicedetailTemplate
            {...data}
        />
    </PrivateRoute>
    // return <ServicedetailTemplate
    //     {...mock}
    // />;
}