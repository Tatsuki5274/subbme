import Title from "components/common/atoms/Title";
import Footer from "components/common/organisms/Footer";
import React, { useState } from "react";
import { ServiceListCardType } from "../molecules/ServiceListCard";
import ServiceListData from "../organisms/ServiceListData";
import styled from "styled-components";
import Text from "components/common/atoms/Text";
import ServiceListFunction from "../organisms/ServiceListFunction";
import { Service, ServiceUnitType } from "entities/Service";
import DrawerContainer from "components/wrapper/Drawer";
import EmptyData from "components/common/molecules/EmptyData";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { routeBuilder } from "router";
import {
  getServiceUnitString,
  getServiceUnitValue,
} from "repositories/Services";

type PropsType = {
  unit: ServiceUnitType;
  setUnit: React.Dispatch<React.SetStateAction<ServiceUnitType>>;

  serviceList: Service[] | null;
  setServiceList: React.Dispatch<React.SetStateAction<Service[] | null>>;
};

export default function ServiceListTemplate(props: PropsType) {
  const [serviceFilterdList, setServiceFilterdList] = useState<
    Service[] | null
  >(props.serviceList);

  let totalCost = 0;
  const unitValue = getServiceUnitValue(props.unit);
  const unitString = getServiceUnitString(props.unit);

  const card: ServiceListCardType[] | null =
    serviceFilterdList?.map((service) => {
      if (!service.id) {
        throw new Error("ServiceID is not defined");
      }

      const cost = (service.costPerDay || 0) * unitValue;
      totalCost += cost;
      return {
        serviceID: service.id,
        serviceName: service.serviceName || "",
        planName: service.planName || "",
        formattedPrice: `${"¥"}${Math.round(
          cost
        ).toLocaleString()}/${unitString}`,
      };
    }) || null;
  const formattedTotalCost = `${"¥"}${Math.round(
    totalCost
  ).toLocaleString()}/${unitString}`;
  return (
    <>
      <DrawerContainer>
        <>
          <Title>サービス一覧</Title>
          <TotalCostStyle>
            <Text>{formattedTotalCost}</Text>
          </TotalCostStyle>
          <ServiceListFunction
            setUnit={props.setUnit}
            serviceList={props.serviceList}
            setServiceList={setServiceFilterdList}
          />
          {card && card.length > 0 ? (
            <ServiceListData data={card} />
          ) : (
            <EmptyData>
              <Link to={routeBuilder.serviceCreatePath()}>
                <Button type="primary">サービス作成</Button>
              </Link>
            </EmptyData>
          )}
        </>
      </DrawerContainer>
      <Footer />
    </>
  );
}

const TotalCostStyle = styled.div({
  fontSize: "27px",
});
