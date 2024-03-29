import {
  Button,
  Cascader,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Service, ServiceUnitEnum, ServiceUnitType } from "entities/Service";
import { useUser } from "hooks/UserHooks";
import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  getServiceUnitValue,
  isServiceUnitType,
  ServiceDao,
} from "repositories/Services";
import { routeBuilder } from "router";
import firebase from "libs/Firebase";
import { listCategories } from "repositories/Categories";
import { useForm } from "antd/lib/form/Form";
import { CascaderValueType } from "antd/lib/cascader";

type FormType = {
  serviceName: string;
  planName: string;
  category: string[];
  detail: string;
  unit: string;
  unitTerm: string;
  currency: string;
  costPerUnitTerm: string;
  paymentMethod: string;
};

export default function ServiceCreateForm() {
  const { currentUser, isSignedIn } = useUser();
  const history = useHistory();
  const [form] = useForm<FormType>();
  const [isCategoryRequest, setIsCategoryRequest] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const initialValues: FormType = {
    serviceName: "",
    planName: "",
    category: [],
    detail: "",
    unit: "",
    unitTerm: "",
    currency: "JPY",
    costPerUnitTerm: "",
    paymentMethod: "",
  };
  const labelCol = {
    span: 4,
  };
  const wrapperCol = {
    span: 16,
  };
  const onFinish = async (values: FormType) => {
    if (!isSignedIn) {
      throw new Error("User is not signed in");
    }
    const unitTerm: number = parseInt(values.unitTerm);
    let unit: ServiceUnitType | null = null;
    if (isServiceUnitType(values.unit)) {
      unit = values.unit;
    } else {
      throw new TypeError("unit is known type");
    }
    const costPerUnitTerm: number = parseInt(values.costPerUnitTerm);
    const unitValue = getServiceUnitValue(unit);

    const data: Service = {
      serviceName: values.serviceName,
      planName: values.planName,
      // categoryName: values.category[values.category.length - 1],
      categoryName: values.category,
      detail: values.detail,
      unit: unit,
      unitTerm: unitTerm,
      currency: values.currency,
      costPerDay: costPerUnitTerm / unitValue / unitTerm,
      paymentMethod: values.paymentMethod,
      userID: currentUser?.uid,
      isArchived: false,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    };
    const result = await ServiceDao.add(data);
    if (result) {
      message.success("保存に成功しました");
      history.push(routeBuilder.serviceListPath());
    } else {
      message.error("失敗しました");
    }
  };
  const onChangeCategory = (value: CascaderValueType) => {
    // カスタムカテゴリの入力切り替え
    let isCustom = false;
    if (value[0] === "カスタム") isCustom = true;
    setIsCustomCategory(isCustom);
  };
  return (
    <Form initialValues={initialValues} onFinish={onFinish} form={form}>
      <Form.Item
        label="サービス名"
        name="serviceName"
        rules={[{ required: true, message: "入力が必須です" }]}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="プラン名"
        name="planName"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="カテゴリ"
        name="category"
        rules={[{ required: true, message: "選択が必須です" }]}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        {/* <Input /> */}
        <Cascader
          options={listCategories()}
          onChange={onChangeCategory}
          placeholder="選択してください"
        />
      </Form.Item>
      {isCustomCategory ? (
        <>
          <Form.Item
            label="カスタムカテゴリ"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            tooltip="カスタムカテゴリは暫定処置です。カテゴリが揃い次第廃止されます。"
          >
            <Input
              onChange={(e) => {
                form.setFieldsValue({ category: ["カスタム", e.target.value] });
              }}
            />
          </Form.Item>
          <Button
            type="link"
            onClick={() => setIsCategoryRequest(!isCategoryRequest)}
          >
            カテゴリ追加リクエスト
          </Button>
        </>
      ) : null}

      {isCategoryRequest ? (
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdYxzVyE8Vzul_GD9LyINbviwVMrpT3veAPYk_bkwUZuhFRuQ/viewform?embedded=true"
          width="100%"
          height="570"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
        >
          読み込んでいます…
        </iframe>
      ) : null}

      <Form.Item
        label="詳細"
        name="detail"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Input.Group compact>
        <Form.Item
          label="周期単位"
          name="unit"
          rules={[{ required: true, message: "入力が必須です" }]}
          style={{ width: "40%" }}
          tooltip="周期の単位を入力します。"
        >
          <Select>
            <Select.Option value={ServiceUnitEnum.Year}>
              年(365日)
            </Select.Option>
            <Select.Option value={ServiceUnitEnum.Month}>
              月(30日)
            </Select.Option>
            <Select.Option value={ServiceUnitEnum.Day}>日(1日)</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="周期"
          name="unitTerm"
          rules={[{ required: true, message: "入力が必須です" }]}
          style={{ width: "60%" }}
          tooltip="支払いの周期を入力します。"
        >
          <InputNumber />
        </Form.Item>
      </Input.Group>
      <Input.Group compact>
        <Form.Item
          label="通貨"
          name="currency"
          style={{ width: "40%" }}
          rules={[{ required: true, message: "入力が必須です" }]}
          tooltip="通貨の選択をします。現在は準備中です。"
        >
          <Select disabled>
            <Select.Option value="JPY">円</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="価格"
          name="costPerUnitTerm"
          style={{ width: "60%" }}
          rules={[
            { required: true, message: "入力が必須です" },
            {
              type: "number",
              min: 1,
              message: "0より大きい金額を入力してください",
            },
          ]}
          tooltip="指定期間に対して支払う金額を入力します。例. 3500を入力した場合 ¥3,500/2ヶ月"
        >
          <InputNumber />
        </Form.Item>
      </Input.Group>
      <Form.Item
        label="支払い方法"
        name="paymentMethod"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" block htmlType="submit">
          登録
        </Button>
      </Form.Item>
    </Form>
  );
}
