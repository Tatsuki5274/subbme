import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import ServiceCreateForm from "../organisms/ServiceCreateForm";

export default function ServiceCreateTemplate() {
  return (
    <>
      <DrawerContainer>
        <>
          <Title>サービス登録</Title>
          <ServiceCreateForm />
        </>
      </DrawerContainer>
      <Footer />
    </>
  );
}
