import styled from "styled-components";
import ServiceListCard, { ServiceListCardType } from "../molecules/ServiceListCard";

type PropsType = {
    data: ServiceListCardType[]
}

export default function ServiceListData(props: PropsType){
    return (
        <div>
            {props.data.map(_data => {
                return (
                    <CardStyle>
                        <ServiceListCard
                            {..._data}
                        />
                    </CardStyle>
                )
            })}
        </div>
    );
}

const CardStyle = styled.div({
    margin: "10px 0",
})