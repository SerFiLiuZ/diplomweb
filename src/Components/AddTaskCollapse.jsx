import React, { useState, useEffect } from 'react';
import { Button, Form, Input, DatePicker, Select } from 'antd';
import Manager from '../API/Maneger';

const { Option } = Select;

const AddTaskCollapse = (props) => {
  const { cardId } = props.card;

  const [form] = Form.useForm();
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [selectedWorkers, setSelectedWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await Manager.getWorkers();
        setAvailableWorkers(response);
        form.resetFields(); // reset form fields after submission
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkers();
  }, []);

  const onFinish = async (values) => {
    try {
      if (selectedWorkers.length === 0) {
        throw new Error('Выберите хотя бы одного работника');
      }

      const urgencyMap = {
        'Нет': 'none',
        'Не очень срочно': '#70a86e',
        'Срочно': '#daa748',
        'Очень срочно': '#d75f5f',
      };

      const response = await Manager.createTask(
        values.title,
        values.description,
        values.dueDate,
        selectedWorkers,
        props.card,
        urgencyMap[values.urgency] // Get the corresponding urgency value from the map
      );
      
      form.resetFields();
      setSelectedWorkers([]);
      props.fetchPosts();
    } catch (error) {
      console.error(error);
      form.setFields([
        {
          name: 'workers',
          errors: [error.message],
        },
      ]);
    }
  };

  const handleSecondaryWorkerSelect = (value) => {
    const worker = availableWorkers.find((w) => w.id === value);
    setSelectedWorkers([...selectedWorkers, worker]);
  };

  const handleSecondaryWorkerDeselect = (value) => {
    const worker = selectedWorkers.find((w) => w.id === value);
    const filteredWorkers = selectedWorkers.filter((w) => w.id !== value);
    setSelectedWorkers(filteredWorkers);
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Создать задачу</h1>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: 'Введите название задачи' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[{ required: true, message: 'Введите описание задачи' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Дата окончания выполнения"
          rules={[{ required: true, message: 'Выберите дату окончания выполнения' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Выберите работников" name="workers" validateStatus="error" help={form.getFieldError('workers')}>
          <Select
            placeholder="Выберите работника"
            onChange={handleSecondaryWorkerSelect}
            onDeselect={handleSecondaryWorkerDeselect}
            value={undefined}
          >
            {availableWorkers &&
              availableWorkers.length > 0 &&
              availableWorkers.map((worker) => (
                <Option key={worker.id} value={worker.id}>
                  {worker.FIO}
                </Option>
              ))}
          </Select>
          <div style={{ marginTop: 16 }}>
            {selectedWorkers.map((worker) => (
              <div key={worker.id} style={{ marginBottom: 8 }}>
                {worker.FIO}{' '}
                <Button onClick={() => handleSecondaryWorkerDeselect(worker.id)} size="small">
                  Убрать
                </Button>
              </div>
            ))}
          </div>
        </Form.Item>
        <Form.Item
        name="urgency"
        label="Срочность"
        // rules={[{ required: true, message: 'Выберите срочность задачи' }]}
      >
        <Select defaultValue="Нет">
          <Option value="Нет">Нет</Option>
          <Option value="Не очень срочно">Не очень срочно</Option>
          <Option value="Срочно">Срочно</Option>
          <Option value="Очень срочно">Очень срочно</Option>
        </Select>
      </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать задачу
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddTaskCollapse;
