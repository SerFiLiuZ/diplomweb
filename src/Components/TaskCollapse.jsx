import { Collapse, Modal } from 'antd';
import Manager from '../API/Maneger';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import AddTaskCollapse from './AddTaskCollapse';
import Cookies from 'js-cookie';

const { Panel } = Collapse;

const TaskCollapse = (props) => {
  const [taskData, setTaskData] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteCardModalVisible, setDeleteCardModalVisible] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await Manager.getTasksByCardId(props.card);
      setTaskData(response);
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const showDeleteConfirm = (task) => {
    setModalVisible(true);
    setTaskToDelete(task);
  };

  const deliteTask = async (id) => {
    try {
      const response = await Manager.deleteTask(id);
      fetchPosts();
      setModalVisible(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const compliteTask = async (id) => {
    try {
      const response = await Manager.compliteTask(id);
      fetchPosts();
    } catch (e) {
      console.log(e.message);
    }
  };

  const deliteCard = async () => {
    setDeleteCardModalVisible(true);
  };

  const confirmDeleteCard = async () => {
    try {
      const response = await Manager.deleteCard(props.card);
      props.fetchBoardData();
      setDeleteCardModalVisible(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const cancelDeleteCard = () => {
    setDeleteCardModalVisible(false);
  };


  const [modalTaskActive, setModalTaskActive] = useState(false);
  const userStatus = Cookies.get('user_status');

  const handleCancel = () => {
    setModalTaskActive(false);
  };

  return (
    <div>
      {!userStatus || userStatus !== 'worker' && (
        <div>
          <Button type="primary" onClick={() => setModalTaskActive(true)}>Добавить задачу</Button>
        </div>
      )}
      <div><h1></h1></div>
      <Collapse>
        {taskData && taskData.map((task, index) => (
          <Panel header={`Задача: ${task.name} || Статус: ${task.done ? 'Выполнено' : 'Выполняется'}`} 
                key={task.id}
                style={{ background: task.task_color }}>
            <p>Описание: {task.description}</p>
            <p>Дата окончания: {task.due_date.substring(0, 10)}</p>
            <p>Выполняющие: {task.assigned}</p>
            <p>Статус: {task.done ? 'Выполнено' : 'Выполняется'}</p>
            <div><h1></h1></div>
            <div>
              <Space wrap>
                <Button type="primary" onClick={() => compliteTask(task.id)}>Выполнено</Button>
                {(!userStatus || userStatus !== 'worker') && (
                  <Button type="primary" onClick={() => showDeleteConfirm(task)}>Удалить задачу</Button>
                )}
              </Space>
            </div>
          </Panel>
        ))}
      </Collapse>
    <div><h1></h1></div>
  {(!userStatus || userStatus !== 'worker') && (
    <div>
      <Button type="primary" onClick={() => deliteCard()}>Удалить список задач</Button>
    </div>
  )}

  <Modal
    visible={modalVisible}
    title="Удаление задачи"
    okText="Удалить"
    cancelText="Отмена"
    onOk={() => deliteTask(taskToDelete.id)}
    onCancel={() => setModalVisible(false)}
  >
    <p>Вы уверены, что хотите удалить задачу "{taskToDelete?.name}"?</p>
  </Modal>

  <Modal
    visible={deleteCardModalVisible}
    title="Удаление карточки"
    okText="Удалить"
    cancelText="Отмена"
    onOk={confirmDeleteCard}
    onCancel={cancelDeleteCard}
  >
    <p>Вы уверены, что хотите удалить карточку?</p>
  </Modal>

  <Modal
      visible={modalTaskActive}
      onCancel={handleCancel}
      footer={null}
      centered
      maskClosable={true}
      closable={false}
    >
      <AddTaskCollapse card={props.card} setActive={setModalTaskActive} fetchPosts={fetchPosts} />
    </Modal>
</div>
);
};

export default TaskCollapse;
         

