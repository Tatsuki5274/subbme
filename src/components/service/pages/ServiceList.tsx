import LoadingScreen from "components/common/organisms/LoadingScreen";
import { useState } from "react";
import { useListService } from "hooks/ServiceHooks"
import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListTemplate from "../templates/ServiceListTemplate";
import { useUser } from "hooks/UserHooks";

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

export default function ServiceList(){
    const [card, setCard] = useState<ServiceListCardType[] | null>(mock);
    const {currentUser} = useUser();
    const {serviceList, isLoading, isEmpty} = useListService(currentUser?.uid);

    const data = null;

    if(isLoading){
        return <LoadingScreen />
    }
    console.log(serviceList);
    if(isEmpty){
        return <span>Empty....</span>
    } else {
        return <span>OK!</span>;
    }

    // return <ServiceListTemplate
    //     formattedTotalCost={"¥10,000/月"}
    //     data={card}
    // />;
}