import { message } from "antd";
import LoadingScreen from "components/common/organisms/LoadingScreen";
import PrivateRoute from "components/wrapper/PrivateRoute";
import { Service } from "entities/Service";
import { useUser } from "hooks/UserHooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { ReportDao } from "repositories/Reports";
import { ServiceDao } from "repositories/Services";
import { routeBuilder } from "router";
import ReportNewTemplate from "../templates/ReportNewTemplate";

const useLocalQuery = (userID: string | null) => {
  const [isLoading, setIsLoading] = useState(true);
  const [serviceList, setServiceList] = useState<Service[] | null>(null);
  const [canCreate, setCanCreate] = useState(false);
  useEffect(() => {
    (async () => {
      if (userID) {
        try {
          const today = new Date();
          const start = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
          );
          const end = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
          );
          // 今日に既にレポートを作成しているかデータを取得して確認する
          const rp = await ReportDao.query((ref) =>
            ref
              .where("userID", "==", userID)
              .where("createdAt", ">=", start)
              .where("createdAt", "<", end)
          );
          if (rp && rp.length > 0) {
            throw new Error("report already created.");
          }
          setCanCreate(true);
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
    canCreate,
  };
};

export default function ReportNew() {
  const history = useHistory();
  const { currentUser } = useUser();
  const { isLoading, serviceList, canCreate } = useLocalQuery(
    currentUser?.uid || null
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!canCreate) {
    message.warn("分析は一日一回のみ作成が可能です");
    history.push(routeBuilder.reportListPath());
  }

  return (
    <PrivateRoute>
      <ReportNewTemplate services={serviceList} />
    </PrivateRoute>
  );
}
