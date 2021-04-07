import { Button, Tabs } from "antd";
import Title from "components/common/atoms/Title";
import EmptyData from "components/common/molecules/EmptyData";
import Footer from "components/common/organisms/Footer";
import DrawerContainer from "components/wrapper/Drawer";
import React from "react";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";
import styled from "styled-components";
import ReportListBox, { ReportListBoxType } from "../organisms/ReportListBox";
import ReportListChartRender from "../organisms/ReportListChartRender";

type PropsType = {
    data: ReportListBoxType[]
}

export default function ReportListTemplate(props: PropsType) {
    const chartMock = [
        {
            date: new Date(2020, 1),
            score: 3
        },
        {
            date: new Date(2020, 3),
            score: 10
        },
        {
            date: new Date(2020, 4, 15),
            score: 7
        }
    ]
    return (
        <>
            <DrawerContainer>
                <>
                    <Title>サービス分析一覧</Title>
                    {/* <ReportListCreateButton>レポート作成</ReportListCreateButton> */}
                    {
                        props.data.length > 0 ?
                            <Tabs>
                                <Tabs.TabPane
                                    tab="ボックス表示"
                                    key="box"
                                >
                                    {
                                        props.data.map(dat => {
                                            return (
                                                <BoxStyle
                                                    key={dat.reportID}
                                                >
                                                    <ReportListBox
                                                        {...dat}
                                                    />
                                                </BoxStyle>

                                            )
                                        })
                                    }
                                </Tabs.TabPane>
                                <Tabs.TabPane
                                    tab="グラフ表示"
                                    key="line"
                                >
                                    <ReportListChartRender
                                        data={chartMock}
                                    />
                                </Tabs.TabPane>
                            </Tabs>
 :
                            <EmptyData>
                                <Link to={routeBuilder.reportNewPath()}>
                                    <Button
                                        type="primary"
                                    >レポート作成</Button>
                                </Link>
                            </EmptyData>
                    }

                </>
            </DrawerContainer>
            <Footer></Footer>
        </>
    );
}

const BoxStyle = styled.div({
    margin: "15px 0",
})