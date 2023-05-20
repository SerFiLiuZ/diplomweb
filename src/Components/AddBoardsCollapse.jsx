import React from 'react';
import { Button, Form, Input } from 'antd';

const AddBoardCollapse = ({ onBoardCreated }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await onBoardCreated(values.title);
      form.resetFields();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Создать проект</h1>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: 'Введите название проекта' }]}
        >
          <Input />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddBoardCollapse;
