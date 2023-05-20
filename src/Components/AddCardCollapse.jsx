import React from 'react';
import { Button, Form, Input } from 'antd';
import Manager from '../API/Maneger';

const AddCardCollapse = ({boardId, onCardCreated}) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await Manager.createCard(values.title, values.description, boardId);
      form.resetFields(); // сбрасываем значения полей формы после отправки
      onCardCreated(); // Call the onCardCreated function after card creation
    } catch (error) {
      console.error(error); // логируем ошибки
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Создать список задач</h1>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: 'Введите название списка' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: 'Введите описание списка' }]}
        >
          <Input.TextArea />
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

export default AddCardCollapse;