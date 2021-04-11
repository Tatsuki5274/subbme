import Result404 from "components/common/organisms/404";
import Result500 from "components/common/organisms/500";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import PrivateRoute from "components/wrapper/PrivateRoute";
import { Service } from "entities/Service";
import { useEffect, useState } from "react";
import { ServiceManager } from "repositories/Services";
import ServiceEditTemplate from "../templates/ServiceEditTemplate";

type PropsType = {
  match: {
    params: {
      serviceID: string;
    };
  };
};

export default function ServiceEdit(props: PropsType) {
  // const mockService: Service = {
  //   id: "userid",
  //   serviceName: "mock service",
  //   costPerDay: 50,
  //   unit: ServiceUnitEnum.Month,
  //   unitTerm: 2,
  //   planName: "プランモック",
  //   detail: "説明ですよ",
  //   categoryName: ["モック", "消えたカテゴリ"],
  //   paymentMethod: "Paypay",
  // };
  const { isLoading, service } = useService(props.match.params.serviceID);
  if (isLoading) {
    return <LoadingScreen />;
  } else if (!service) {
    return <Result404 />;
  } else if (!service.id) {
    return <Result500 />;
  }

  return (
    <PrivateRoute>
      <ServiceEditTemplate service={service} />
    </PrivateRoute>
  );
}

function useService(serviceID: string) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    (async () => {
      const manager = new ServiceManager();
      const result = await manager.get(serviceID);
      if (result) {
        setService(result);
      }
      setIsLoading(false);
    })();
  }, [serviceID]);
  return {
    service,
    isLoading,
  };
}
