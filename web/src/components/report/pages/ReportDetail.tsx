import ReportDetailTemplate from "../templates/ReportDetailTemplate";

export default function ReportDetail() {
  const mock = {
    score: 10,
    recommend: {
      comment: "テストコメント",
      link: "hogehoge",
    },
    serviceListA: [],
    serviceListB: [],
    serviceListC: [],
  };
  return <ReportDetailTemplate {...mock} />;
}
