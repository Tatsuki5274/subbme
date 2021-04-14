import { ReportService } from "entities/ReportService";
import ReportDetailTemplate from "../templates/ReportDetailTemplate";

export default function ReportDetail() {
  const mockServiceList: ReportService[] = [
    {
      id: "hoge",
      serviceName: "DropBox",
      costPerDay: 50,
      rate: 2,
      categoryName: ["保険", "自動車保険"],
      rank: "A",
    },
  ];
  const mock = {
    score: 10,
    recommend: {
      comment: "テストコメント",
      link: "hogehoge",
    },
    serviceListA: mockServiceList,
    serviceListB: [],
    serviceListC: [],
  };
  return <ReportDetailTemplate {...mock} />;
}
