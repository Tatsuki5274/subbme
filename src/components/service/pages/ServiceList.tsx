import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListTemplate from "../templates/ServiceListTemplate";

export default function ServiceList(){
    const mock: ServiceListCardType[] = [
        {
            serviceName: "Dropbox",
            planName: "Plusプラン",
            formattedOriginalPrice: "¥20,000/3年",
            formattedConvertPrice: "¥900/月"
        },
        {
            serviceName: "Dropbox",
            planName: "Plusプラン",
            formattedOriginalPrice: "¥20,000/3年",
            formattedConvertPrice: "¥900/月"
        },
    ]
    return <ServiceListTemplate
        formattedTotalCost={"¥10,000/月"}
        data={mock}
    />;
}