import LinkedBlock from "components/wrapper/LinkedBlock";
import { routeBuilder } from "router";
import styled from "styled-components";
import ServiceListCard, {
  ServiceListCardType,
} from "../molecules/ServiceListCard";

type PropsType = {
  data: ServiceListCardType[];
};

export default function ServiceListData(props: PropsType) {
  return (
    <div>
      {props.data.map((_data) => {
        return (
          <LinkedBlock
            key={_data.serviceID}
            to={routeBuilder.serviceDetailPath(_data.serviceID)}
          >
            <CardStyle>
              <ServiceListCard {..._data} />
            </CardStyle>
          </LinkedBlock>
        );
      })}
    </div>
  );
}

const CardStyle = styled.div({
  margin: "10px 0",
});
