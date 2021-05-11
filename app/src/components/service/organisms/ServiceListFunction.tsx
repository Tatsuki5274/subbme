import { Select } from "antd";
import { Service, ServiceUnitEnum, ServiceUnitType } from "entities/Service";
import React from "react";
import { getServiceUnitString } from "repositories/Services";
const { Option } = Select;

type PropsType = {
  setUnit: React.Dispatch<React.SetStateAction<ServiceUnitType>>;
  serviceList: Service[] | null;
  setServiceList: React.Dispatch<React.SetStateAction<Service[] | null>>;
};

export const ServiceOrderByCreatedAtDesc = (a: Service, b: Service) => {
  return a.createdAt && b.createdAt && a.createdAt < b.createdAt ? 1 : -1;
};
export const ServiceOrderByCostDesc = (a: Service, b: Service) => {
  return a.costPerDay && b.costPerDay && a.costPerDay < b.costPerDay ? 1 : -1;
};

/**
 * @returns
 */
export default function ServiceListFunction(props: PropsType) {
  const sortSelection = [
    {
      display: "価格の高い順",
      value: "cost",
    },
    {
      display: "新しい順",
      value: "new",
    },
  ];
  return (
    <>
      <Select
        onChange={(value) => {
          props.setUnit(value);
        }}
        defaultValue={ServiceUnitEnum.Month}
      >
        {Object.values(ServiceUnitEnum).map((unit) => {
          return (
            <Option key={unit} value={unit}>
              {getServiceUnitString(unit)}
            </Option>
          );
        })}
      </Select>
      <Select
        onChange={(value) => {
          const serviceList = props.serviceList;
          switch (value) {
            case "new":
              serviceList?.sort(ServiceOrderByCreatedAtDesc);
              break;
            case "cost":
              serviceList?.sort(ServiceOrderByCostDesc);
          }
          if (serviceList) {
            props.setServiceList(serviceList.concat());
          }
        }}
        defaultValue={sortSelection[0].value}
      >
        {sortSelection.map((sel) => {
          return (
            <Option key={sel.value} value={sel.value}>
              {sel.display}
            </Option>
          );
        })}
      </Select>
    </>
  );
}
