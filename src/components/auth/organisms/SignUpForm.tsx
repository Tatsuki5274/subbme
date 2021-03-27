import { Form, Input, Button, Checkbox } from 'antd';
import { signUpUser } from 'repositories/User';

type FormType = {
    email: string
    password: string
}

export default function SignUpForm(){
    const onFinish = async (values: FormType) => {
        console.log('Success:', values);
        const user = await signUpUser(values.email, values.password)
        console.log("user", user)
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="signup"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="メールアドレス"
                name="email"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="パスワード"
                name="password"
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    新規登録
                </Button>
            </Form.Item>
        </Form>
    )
    return null;
}