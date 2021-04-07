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
    boxData: ReportListBoxType[]
    chartData: ReportListChartType[]
}

export type ReportListChartType = {
    date: Date,
    score: number,  
}

function ConvertChartFormat(data: ReportListBoxType[]): ReportListChartType[] {
    console.log(data)
    const result: ReportListChartType[] = [];
    data.forEach(dat => {
        try {
            const date: Date = new Date(dat.date);
            result.push({
                score: dat.score,
                date: date,
            });
        } catch(e) {
            //日付の入力に異常がある場合はデータを無視する
        }
    })
    return result;
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
                        props.boxData.length > 0 ?
                            <Tabs>
                                <Tabs.TabPane
                                    tab="ボックス表示"
                                    key="box"
                                >
                                    {
                                        props.boxData.map(dat => {
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
                                    tab="グラフ表示(β)"
                                    key="line"
                                >
                                    <ReportListChartRender
                                        data={props.chartData}
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