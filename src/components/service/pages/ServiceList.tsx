import LoadingScreen from "components/common/organisms/LoadingScreen";
import { useState } from "react";
import { useListService } from "hooks/ServiceHooks";
import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListTemplate from "../templates/ServiceListTemplate";
import { useUser } from "hooks/UserHooks";
import { ServiceUnitEnum, ServiceUnitType } from "entities/Service";
// import { UnitConverter } from "libs/Util";
import {
  getServiceUnitString,
  getServiceUnitValue,
} from "repositories/Services";
import PrivateRoute from "components/wrapper/PrivateRoute";

// const mock: ServiceListCardType[] = [
//     {
//         serviceName: "Dropbox",
//         planName: "Plusプラン",
//         formattedPrice: "¥900/月"
//     },
//     {
//         serviceName: "Dropbox",
//         planName: "Plusプラン",
//         formattedPrice: "¥20,000/3年"
//     },
// ]

// function Convert(serviceInput: Service, toUnit: ServiceUnitType, toCurrency: unknown): ServiceListFunctionType{
//     const originalCostPerUnitTerm = serviceInput.costPerUnitTerm ? parseInt(serviceInput.costPerUnitTerm) : 0;
//     // convertUnit: string;
//     // convertUnitTerm: string;
//     // convertCostPerUnitTerm: number;
//     // convertCurrency: string;
//     const convertValue = UnitConverter(serviceInput.unit, toUnit)
//     const result: ServiceListFunctionType = {
//         serviceName: serviceInput.serviceName || "",
//         planName: serviceInput.planName || "",
//         originalUnit: serviceInput.unit || "",
//         originalUnitTerm: serviceInput.unitTerm?.toString() || "",
//         originalCurrency: "JPY",
//         originalCostPerUnitTerm: originalCostPerUnitTerm,
//         convertUnit: toUnit,
//         convertCostPerUnitTerm: originalCostPerUnitTerm * convertValue,
//         convertCurrency: "JPY",
//         convertUnitTerm:
//     };
//     return result;
// }

export default function ServiceList() {
  const { currentUser } = useUser();
  const { serviceList, setServiceList, isLoading } = useListService(
    currentUser?.uid
  );
  const [unit, setUnit] = useState<ServiceUnitType>(ServiceUnitEnum.Month);
  console.log(serviceList);

  let totalCost = 0;
  const unitValue = getServiceUnitValue(unit);
  const unitString = getServiceUnitString(unit);
  const card: ServiceListCardType[] | null =
    serviceList?.map((service) => {
      if (!service.id) {
        throw new Error("ServiceID is not defined");
      }

      const cost = (service.costPerDay || 0) * unitValue;
      totalCost += cost;
      return {
        serviceID: service.id,
        serviceName: service.serviceName || "",
        planName: service.planName || "",
        formattedPrice: `${"¥"}${Math.round(
          cost
        ).toLocaleString()}/${unitString}`,
      };
    }) || null;

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      {/* <button
            onClick={()=>{
                serviceList?.sort((a, b) => {
                    return a.costPerDay && b.costPerDay && (a.costPerDay > b.costPerDay) ? 1 : -1;
                })
                if(serviceList){
                    setServiceList(serviceList.concat());
                }
            }}
        >そーと</button> */}
      <PrivateRoute>
        <ServiceListTemplate
          formattedTotalCost={`${"¥"}${Math.round(
            totalCost
          ).toLocaleString()}/${unitString}`}
          cardData={card}
          setUnit={setUnit}
          serviceList={serviceList}
          setServiceList={setServiceList}
        />
      </PrivateRoute>
    </>
  );
}
