import { Button, Cascader, Form, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CategoryData } from 'common/master';
import { Service } from 'entities/Service';
import React, { useRef } from 'react';

type FormType = {
    serviceName: string
    planName: string
    category: string[],
    detail: string,
    unit: string,
    unitTerm: string,
    currency: string,
    costPerUnitTerm: string,
    paymentMethod: string
}

export default function ServiceCreateForm(){
    // const [form] = Form.useForm();
    // form.setFieldsValue({categoryID: "aaa"})
    const initialValues: FormType = {
        serviceName: "",
        planName: "",
        category: [],
        detail: "",
        unit: "",
        unitTerm: "",
        currency: "",
        costPerUnitTerm: "",
        paymentMethod: "",
    }
    const onFinish = (values: Service) => {
        console.log(values)
    }
    return (
        <Form
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Form.Item
                label="サービス名"
                name="serviceName"
                rules={[{required: true, message: "入力が必須です"}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="プラン名"
                name="planName"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="カテゴリ"
                name="category"
                rules={[{required: true, message: "選択が必須です"}]}
            >
                {/* <Input /> */}
                <Cascader
                    options={CategoryData}
                    // onChange={onChange}
                    placeholder="Please select"
                />
            </Form.Item>
            <Form.Item
                label="詳細"
                name="detail"
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                label="通貨"
                name="currency"
            >
                <Select>
                    <Select.Option value="JPY">円</Select.Option>
                </Select>            
            </Form.Item>
            <Form.Item
                label="価格"
                name="costPerUnitTerm"
                rules={[
                    {required: true, message: "入力が必須です"},
                    {type: "number", min: 1, message: "0より大きい金額を入力してください"}
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                label="周期単位"
                name="unit"
            >
                <Select>
                    <Select.Option value="year">年</Select.Option>
                    <Select.Option value="month">月</Select.Option>
                    <Select.Option value="day">日</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="周期"
                name="unitTerm"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="支払い方法"
                name="paymentMethod"
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">登録</Button>
            </Form.Item>
        </Form>
    );
}