import React from 'react';
import { Card, Flex, Typography, Form, Input, Button, Spin, Alert } from 'antd'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin';
const Login = () => {
    const { error, loading, loginUser } = useLogin();
    const handleLogin = async (values) => {
        await loginUser(values);
    }
    return <Card className="form-container">
        <Flex vertical flex={1}>
            <Flex >
                <Typography.Title level={3} strong className="title">
                    Login
                </Typography.Title>

                <Typography.Text type="secondary" strong className="slogan">
                    Unlock your World!
                </Typography.Text>
            </Flex>
            <Form layout='vertical' onFinish={handleLogin}>


                <Form.Item label="Email" name="email" rules={
                    [
                        {
                            required: true,
                            message: 'please enter your email!',
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid Email!'
                        }
                    ]
                }>
                    <Input size="large" placeholder="Enter your email"></Input>
                </Form.Item>


                <Form.Item label="Password" name="password" rules={
                    [
                        {
                            required: true,
                            message: 'please enter your password!',
                        },

                    ]
                }>
                    <Input size="large" placeholder="Enter your password"></Input>
                </Form.Item>


                {error && (
                    <Alert
                        description={error}
                        type="error"
                        showIcon
                        closable
                        className="alert"
                    />
                )}



                <Form.Item>
                    <Button type={`${loading}? '' : 'primary'`} htmlType="submit" size="large" className="btn">{loading ? <Spin /> : 'SignIn'}</Button>
                </Form.Item>

                <Form.Item>
                    <Link to="/">
                        <Button size="large" className="btn">Create An Account</Button>
                    </Link>
                </Form.Item>



            </Form>
            <Flex>

            </Flex>
        </Flex>
    </Card>
};

export default Login