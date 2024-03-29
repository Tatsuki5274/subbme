import { ServiceOrderByCostDesc } from "components/service/organisms/ServiceListFunction";
import { Service } from "entities/Service";
import { useEffect, useState } from "react";
import { ServiceDao } from "repositories/Services";

export function useListService(userID?: string) {
  const [serviceList, setServiceList] = useState<Service[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);
      if (userID) {
        const data = await ServiceDao.query((ref) =>
          ref.where("userID", "==", userID)
        );
        data?.sort(ServiceOrderByCostDesc);

        // const ref = getServiceR ef();
        // const query = await ref.where("userID", "==", userID);
        // const data = await listService(query);
        setServiceList(data);
        setIsLoading(false);
        if (data && data.length > 0) {
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      } else {
        setServiceList(null);
        setIsLoading(false);
        setIsEmpty(true);
      }
    };
    fn();
  }, [userID]);
  // console.log(serviceList, isLoading, isEmpty)
  return { serviceList, setServiceList, isLoading, isEmpty };
}

export function useGetService(serviceID: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    (async () => {
      const data = await ServiceDao.get(serviceID);
      if (data) {
        setService(data);
      }
      setIsLoading(false);
    })();
  }, [serviceID]);

  return { service, isLoading };
}
