import LoadingScreen from "components/common/organisms/LoadingScreen";
import PrivateRoute from "components/wrapper/PrivateRoute";
import { Service } from "entities/Service";
import { useUser } from "hooks/UserHooks";
import React, { useEffect, useState } from "react";
import { ServiceDao } from "repositories/Services";
import ReportNewTemplate from "../templates/ReportNewTemplate";

const useLocalQuery = (userID: string | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [serviceList, setServiceList] = useState<Service[] | null>(null);
  useEffect(() => {
    (async () => {
      if (userID) {
        try {
          const sv = await ServiceDao.query((ref) =>
            ref.where("userID", "==", userID).where("isArchived", "!=", true)
          );
          setServiceList(sv);
        } catch (e) {
          setServiceList(null);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [userID]);
  return {
    isLoading,
    serviceList,
  };
};

export default function ReportNew() {
  const { currentUser } = useUser();
  const { isLoading, serviceList } = useLocalQuery(currentUser?.uid || null);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <PrivateRoute>
      <ReportNewTemplate services={serviceList} />
    </PrivateRoute>
  );
}
