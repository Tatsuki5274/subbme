import { Form, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { Service, ServiceUnitEnum, ServiceUnitType } from "entities/Service";
import React, { useEffect } from "react";
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
    archive: "except" | "include" | "only";
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
    archive: "except",
  };
  const onChange = (values: FormType) => {
    props.setUnit(values.unit as ServiceUnitType);
    let serviceList = props.serviceList;
    switch (values.order) {
      case "new":
        serviceList?.sort(ServiceOrderByCreatedAtDesc);
        break;
      case "cost":
        serviceList?.sort(ServiceOrderByCostDesc);
    }

    if (serviceList) {
      // アーカイブのフィルター
      if (values.archive === "except") {
        // アーカイブを除外する場合
        serviceList = serviceList.filter((sv) => sv.isArchived !== true);
      } else if (values.archive === "only") {
        serviceList = serviceList.filter((sv) => sv.isArchived === true);
      }
      props.setServiceList(serviceList.concat());
    }
  };

  useEffect(() => {
    // 初回ロード時に初期設定のフィルタを実行
    onChange(form.getFieldsValue());
  }, []);

  return (
    <Form
      form={form}
      initialValues={initialValues}
      layout="inline"
      onChange={() => onChange(form.getFieldsValue())}
    >
      <Form.Item label="表示単位" name="unit">
        <Select onChange={() => onChange(form.getFieldsValue())}>
          {Object.values(ServiceUnitEnum).map((unit) => {
            return (
              <Option key={unit} value={unit}>
                {getServiceUnitString(unit)}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="表示順" name="order">
        <Select onChange={() => onChange(form.getFieldsValue())}>
          {sortSelection.map((sel) => {
            return (
              <Option key={sel.value} value={sel.value}>
                {sel.display}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item label="アーカイブ" name="archive">
        <Select onChange={() => onChange(form.getFieldsValue())}>
          <Option key="except" value="except">
            除外
          </Option>
          <Option key="only" value="only">
            アーカイブのみ
          </Option>
          {/* アーカイブとの見分けをつけたら実装 */}
          {/* <Option key="include" value="include">
            全て
          </Option> */}
        </Select>
      </Form.Item>
    </Form>
  );
}
