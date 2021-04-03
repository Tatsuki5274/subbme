import BorderLine from "components/common/atoms/BorderLine";
import GrayText from "components/common/atoms/GrayText";
import LinkedBlock from "components/wrapper/LinkedBlock";
import React from "react";
import { routeBuilder } from "router";
import styled from "styled-components";
import CircleBox from "../molecules/CircleBox";

type PropsType = {
    reportID: string
    date: string
    cost: string
    comment: string
    score: number
}

export type ReportListBoxType = PropsType;

export default function ReportListBox(props: PropsType) {
    return (
        <LinkedBlock
            to={routeBuilder.reportDetailPath(props.reportID)}
        >
            <BoxStyle>
                <TopStyle>
                    <DateStyle>
                        <GrayText>
                            {props.date}
                        </GrayText>
                    </DateStyle>
                    <CostStyle>
                        <GrayText>
                            {props.cost}
                        </GrayText>
                    </CostStyle>
                </TopStyle>

                <BorderLine />

                <BottomStyle>
                    <CommentStyle>
                        <GrayText>
                            {props.comment}
                        </GrayText>
                    </CommentStyle>
                    <CircleStyle>
                        <CircleBox>
                            <GrayText>
                                {props.score}
                            </GrayText>
                        </CircleBox>
                    </CircleStyle>
                </BottomStyle>

            </BoxStyle>
        </LinkedBlock>

    );
}

const BoxStyle = styled.div({
    backgroundColor: "#FAFAFA",
    border: "solid 1px #707070",
    borderRadius: "5px",
})

const DateStyle = styled.span({
    fontSize: "26px",
})

const CostStyle = styled.span({
    fontSize: "26px",
})

const TopStyle = styled.div({
    display: "flex",
    justifyContent: "space-between",
})

const CommentStyle = styled.div({
    width: "calc( 100% - 100px )",
    display: "inline-block",
    fontSize: "14px",
})

const CircleStyle = styled.div({
    width: "70px",
    height: "70px",
    fontSize: "24px",
    display: "inline-block",
    marginTop: "10px",
})

const BottomStyle = styled.div({
    display: "flex",
    justifyContent: "space-between",
})