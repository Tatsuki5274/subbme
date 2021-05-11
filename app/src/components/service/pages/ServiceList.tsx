import LoadingScreen from "components/common/organisms/LoadingScreen";
import { useState } from "react";
import { useListService } from "hooks/ServiceHooks";
import ServiceListTemplate from "../templates/ServiceListTemplate";
import { useUser } from "hooks/UserHooks";
import { ServiceUnitEnum, ServiceUnitType } from "entities/Service";
import PrivateRoute from "components/wrapper/PrivateRoute";

export default function ServiceList() {
  const { currentUser } = useUser();
  const { serviceList, setServiceList, isLoading } = useListService(
    currentUser?.uid
  );
  const [unit, setUnit] = useState<ServiceUnitType>(ServiceUnitEnum.Month);

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <PrivateRoute>
        <ServiceListTemplate
          unit={unit}
          setUnit={setUnit}
          serviceList={serviceList}
          setServiceList={setServiceList}
        />
      </PrivateRoute>
    </>
  );
}
