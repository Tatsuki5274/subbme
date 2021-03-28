import { Form, Input, Button, message } from 'antd';
import { formLayout } from 'common/styles';
import { useHistory } from 'react-router';
import { signUpUser } from 'repositories/User';
import { routeBuilder } from 'router';

type FormType = {
    email: string
    password: string
}

export default function SignUpForm(){
    const history = useHistory();
    const onFinish = async (values: FormType) => {
        signUpUser(values.email, values.password)
            .then(user => {
                message.success("ログインに成功しました")
                history.push(routeBuilder.topPath());
            })
            .catch(reason => {
                message.error("ログインに失敗しました");
                console.error(reason)
            })
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