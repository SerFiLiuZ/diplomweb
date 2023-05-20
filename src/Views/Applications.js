import React, { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'antd';
import Manager from '../API/Maneger';

function Application() {
  const [data, setData] = useState([]);
  const [modalAcceptVisible, setModalAcceptVisible] = useState(false);
  const [modalRejectVisible, setModalRejectVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

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
      key: 'phoneNumber',
    },
    {
      title: 'Имя в Телеграмм',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Дата заявки',
      dataIndex: 'dataApplication',
      key: 'dataApplication',
    },
    {
      title: 'Решение',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => showAcceptConfirmationModal(record)} style={{ marginRight: '10px' }}>
            Принять
          </Button>
          <Button type="primary" onClick={() => showRejectConfirmationModal(record)}>
            Отклонить
          </Button>
        </span>
      ),
    },
  ];

  const showAcceptConfirmationModal = (record) => {
    setSelectedApplication(record);
    setModalAcceptVisible(true);
  };

  const showRejectConfirmationModal = (record) => {
    setSelectedApplication(record);
    setModalRejectVisible(true);
  };

  const handleAcceptApplication = async () => {
    try {
      if (selectedApplication) {
        const response = await Manager.AcceptApplications(selectedApplication.chatID);
        fetchData();
        setModalAcceptVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectApplication = async () => {
    try {
      if (selectedApplication) {
        const response = await Manager.RejectApplications(selectedApplication.chatID);
        fetchData();
        setModalRejectVisible(false);
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
      const response = await Manager.getApplications();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <Table columns={columns} dataSource={data} />

      <Modal
        title="Подтверждение принятия заявки"
        visible={modalAcceptVisible}
        onOk={handleAcceptApplication}
        onCancel={() => setModalAcceptVisible(false)}
        okText="Принять"
        cancelText="Отменить"
      >
        <p>Вы действительно хотите принять заявку?</p>
      </Modal>

      <Modal
        title="Подтверждение отклонения заявки"
        visible={modalRejectVisible}
        onOk={handleRejectApplication}
        onCancel={() => setModalRejectVisible(false)}
        okText="Отклонить"
        cancelText="Отменить"
      >
        <p>Вы действительно хотите отклонить заявку?</p>
      </Modal>
    </div>
  );
};

export default Application;

