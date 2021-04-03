import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import ReportListBox, { ReportListBoxType } from "../organisms/ReportListBox";

type PropsType = {
    data: ReportListBoxType[]
}

export default function ReportListTemplate(props: PropsType) {
    return (
        <>
            <DrawerContainer>
                <>
                    {props.data.map(dat => {
                        return (
                            <ReportListBox
                                {...dat}
                            />
                        )
                    })}
                </>
            </DrawerContainer>
            <Footer></Footer>
        </>
    );
}