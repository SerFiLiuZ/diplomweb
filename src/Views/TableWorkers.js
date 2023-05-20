import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import Manager from '../API/Maneger';

function TableWorkers() {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'FIO',
      key: 'fio',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Телефонный номер',
      dataIndex: 'phoneNumber',
      key: 'telephone',
    },
    {
      title: 'Имя в Телеграмм',
      dataIndex: ['idTgData', 'userName'],
      key: 'tgname',
    },
    {
      title: 'Решение',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => showConfirmationModal(record)} style={{ marginRight: '10px' }}>
            Удалить
          </Button>
        </span>
      ),
    },
  ];

  const showConfirmationModal = (record) => {
    setSelectedWorker(record);
    setModalVisible(true);
  };

  const handleDeleteWorker = async () => {
    try {
      if (selectedWorker) {
        const response = await Manager.DismissWorker(selectedWorker.id);
        fetchData();
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Manager.getWorkers();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Подтверждение удаления"
        visible={modalVisible}
        onOk={handleDeleteWorker}
        onCancel={() => setModalVisible(false)}
        okText="Удалить"
        cancelText="Отменить"
      >
        <p>Вы действительно хотите удалить работника?</p>
      </Modal>
    </div>
  );
}

export default TableWorkers;
