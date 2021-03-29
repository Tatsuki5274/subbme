import Footer from "components/common/organisms/Footer";
import ContentWrapper from "components/wrapper/ContentWrapper";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import ServiceDetailMid from "../organisms/ServiceDetailMid";
import ServiceDetailTop from "../organisms/ServiceDetailTop";

type PropsType = {
    serviceName: string
    planName: string
    originalPrice: string
    categoryName: string
    detail: string
}

export default function ServicedetailTemplate(props: PropsType) {
    return <>
        <DrawerContainer>
            <ContentWrapper>
                <>
                    <ServiceDetailTop
                        serviceName={props.serviceName}
                        planName={props.planName}
                        originalPrice={props.originalPrice}
                        categoryName={props.categoryName}
                    />
                    <ServiceDetailMid
                        detail={props.detail}
                    />
                </>
            </ContentWrapper>
        </DrawerContainer>
        <Footer/>
    </>;
}