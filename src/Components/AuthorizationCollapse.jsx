import React from 'react';
import { Button, Form, Input, Card } from 'antd';
import Manager from '../API/Maneger';

function AuthorizationCollapse({ setIsLoggedIn }) {
  const onFinish = async (values) => {
    const registrationResponse = await Manager.AuthorizationSession(
      values.username,
      values.password
    );

    if (registrationResponse.success) {
      localStorage.setItem('authorization', 'yes');
      setIsLoggedIn(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Авторизация" style={{ width: 400 }}>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Логин"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Авторизация
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default AuthorizationCollapse;
