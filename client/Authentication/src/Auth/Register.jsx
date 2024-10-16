import React from 'react';
import { Card, Flex, Typography, Form, Input, Button, Spin, Alert } from 'antd'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignUp';
const Register = () => {
    const { loading, error, registerUser } = useSignup();

    const handleRegister = async (values) => {
        await registerUser(values);
    }
    console.log(error);
    return <Card className="form-container">
        <Flex vertical flex={1}>
            <Flex >
                <Typography.Title level={3} strong className="title">
                    Create An Account
                </Typography.Title>

                <Typography.Text type="secondary" strong className="slogan">
                    Join for exclusive access!
                </Typography.Text>
            </Flex>
            <Form layout='vertical' onFinish={handleRegister}>
                <Form.Item label="Full Name" name="name" rules={
                    [
                        {
                            required: true,
                            message: 'please enter your full name!',
                        }
                    ]
                }>
                    <Input size="large" placeholder="Enter your full name"></Input>
                </Form.Item>

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

                <Form.Item label="Password" name="passwordConfirm" rules={
                    [
                        {
                            required: true,
                            message: 'please enter your confirm password!',
                        },

                    ]
                }>
                    <Input size="large" placeholder="Enter your confirmed password"></Input>
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
                    <Button type={`${loading}? '' : 'primary'`} htmlType="submit" size="large" className="btn">{loading ? <Spin /> : 'CreateAccount'}</Button>
                </Form.Item>

                <Form.Item>
                    <Link to="/login">
                        <Button size="large" className="btn">Sign In</Button>
                    </Link>
                </Form.Item>



            </Form>
            <Flex>

            </Flex>
        </Flex>
    </Card>
};

export default Register