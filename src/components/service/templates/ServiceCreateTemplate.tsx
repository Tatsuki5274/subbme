import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import Header from "components/common/organisms/Header";
import ServiceCreateForm from "../organisms/ServiceCreateForm";

export default function ServiceCreateTemplate(){
    return (
        <>
            <Header />
            <Title>サービス登録</Title>
            <ServiceCreateForm />
            <Footer />
        </>
    );
}