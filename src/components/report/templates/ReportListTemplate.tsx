import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import ReportListBox, { ReportListBoxType } from "../organisms/ReportListBox";
import ReportListCreateButton from "../organisms/ReportListCreateButton";

type PropsType = {
    data: ReportListBoxType[]
}

export default function ReportListTemplate(props: PropsType) {
    return (
        <>
            <DrawerContainer>
                <>
                    <Title>サービス分析一覧</Title>
                    <ReportListCreateButton>レポート作成</ReportListCreateButton>
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