import { Form, Input, Button } from 'antd';
import { formLayout } from 'common/styles';
import { signUpUser } from 'repositories/User';

type FormType = {
    email: string
    password: string
}

export default function SignUpForm(){
    const onFinish = async (values: FormType) => {
        const user = await signUpUser(values.email, values.password)
        console.log("user", user)
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...formLayout}
            name="signup"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="メールアドレス"
                name="email"
                rules={[{required: true, message: "入力が必須です"}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="パスワード"
                name="password"
                rules={[{required: true, message: "入力が必須です"}]}
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
}