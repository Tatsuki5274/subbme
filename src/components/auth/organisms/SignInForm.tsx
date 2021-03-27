import { signInUser } from "repositories/User";
import { Form, Input, Button } from 'antd';

type FormType = {
    email: string
    password: string
}

export default function SingInForm(){
    const initialValues: FormType= {
        email: "",
        password: ""
    };
    const onFinish = async (values: FormType) => {
        const user = await signInUser(values.email, values.password);
        console.log("singin", user);
        console.log("values", values);
    }
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="singin"
            initialValues={initialValues}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="メールアドレス"
                name="email"
                rules={[{ required: true, message: "入力が必須です" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="パスワード"
                name="password"
                rules={[{ required: true, message: "入力が必須です" }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">ログイン</Button>
            </Form.Item>
        </Form>
    );
}