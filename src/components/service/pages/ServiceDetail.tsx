import ServicedetailTemplate from "../templates/ServiceDetailTemplate";

const mock = {
    serviceID: "hogehoge",
    serviceName: "dropbox",
    planName: "クラウド",
    originalPrice: "¥2000/2月",
    categoryName: "クラウド",
    detail: "詳細です"
}

export default function ServiceDetail(props: any) {
    console.log(props)
    return <ServicedetailTemplate
        {...mock}
    />;
}