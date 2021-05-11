import { Form, Input, Select, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
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
  if (!a.costPerDay || !b.costPerDay) return 0; // 意図しない結果になりそう
  if (a.costPerDay < b.costPerDay) return 1;
  if (a.costPerDay > b.costPerDay) return -1;
  return 0;
};

/**
 * @returns
 */
export default function ServiceListFunction(props: PropsType) {
  type FormType = {
    order: string;
    unit: string;
  };
  const [form] = useForm<FormType>();
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
  const initialValues: FormType = {
    order: "cost",
    unit: ServiceUnitEnum.Month,
  };
  const onChange = (values: FormType) => {
    props.setUnit(values.unit as ServiceUnitType);
    const serviceList = props.serviceList;
    switch (values.order) {
      case "new":
        serviceList?.sort(ServiceOrderByCreatedAtDesc);
        break;
      case "cost":
        serviceList?.sort(ServiceOrderByCostDesc);
    }
    if (serviceList) {
      props.setServiceList(serviceList.concat());
    }
  };
  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="inline"
      onChange={() => onChange(form.getFieldsValue())}
    >
      <Form.Item name="unit">
        <Select
          defaultValue={ServiceUnitEnum.Month}
          onChange={() => onChange(form.getFieldsValue())}
        >
          {Object.values(ServiceUnitEnum).map((unit) => {
            return (
              <Option key={unit} value={unit}>
                {getServiceUnitString(unit)}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="order">
        <Select
          defaultValue={sortSelection[0].value}
          onChange={() => onChange(form.getFieldsValue())}
        >
          {sortSelection.map((sel) => {
            return (
              <Option key={sel.value} value={sel.value}>
                {sel.display}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
}
