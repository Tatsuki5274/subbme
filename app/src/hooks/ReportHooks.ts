import { Report } from "entities/Report";
import { NullablePartial } from "libs/Util";
import { useEffect, useState } from "react";
import { ReportDao } from "repositories/Reports";

type ReturnType = {
  reportList: NullablePartial<Report>[] | null;
  isLoading: boolean;
  isEmpty: boolean;
};

export function useReportQuery(userID?: string): ReturnType;

export function useReportQuery(arg1: unknown): ReturnType {
  const [reportList, setReportList] = useState<Report[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      let result: Report[] | null = null;
      // オーバーロードの実装
      if (!arg1) {
        // 必要な情報が与えられていない場合はロード中
        setIsEmpty(true);
        setIsLoading(true);
        setReportList(null);
        result = null;
      } else if (typeof arg1 === "string") {
        // 文字が入力された場合はユーザーIDとして解釈する
        const userID = arg1;
        result = await ReportDao.query((ref) => {
          return ref.where("userID", "==", userID);
        });
        setIsLoading(false);
      } else {
        // 該当しない入力は実装されていない
        throw new Error("Method is not implement");
      }
      if (result) {
        setReportList(result);
        if (result.length > 0) {
          setIsEmpty(false);
        }
      }
    })();
  }, [arg1]);
  return {
    reportList,
    isLoading,
    isEmpty,
  };
}
