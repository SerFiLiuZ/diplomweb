import { Collapse, Modal } from 'antd';
import React, { useState } from "react";
import TaskCollapse from '../Components/TaskCollapse';
import { Button } from 'antd';
import Manager from '../API/Maneger';
import AddCardCollapse from './AddCardCollapse';
import Cookies from 'js-cookie';

const { Panel } = Collapse;

const CardCollapse = (props) => {
  const { boardId } = props;

  const [deleteBoardModalVisible, setDeleteBoardModalVisible] = useState(false);

  const deliteBoard = async () => {
    setDeleteBoardModalVisible(true);
  };

  const confirmDeleteBoard = async () => {
    try {
      await Manager.deleteBoard(boardId);
      props.onBoardDeleted();
      setDeleteBoardModalVisible(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  const cancelDeleteBoard = () => {
    setDeleteBoardModalVisible(false);
  };

  const [modalCardActive, setModalCardActive] = useState(false);

  const userStatus = Cookies.get('user_status');

  const handleCardCreated = () => {
    props.fetchBoardData();
  };

  const handleCancel = () => {
    setModalCardActive(false);
  };

  return (
    <div>
      {userStatus !== 'worker' && (
        <div>
          <Button type="primary" onClick={() => setModalCardActive(true)}>Создать список задач</Button>
        </div>
      )}
      <div><h1></h1></div>
      <Collapse>
        {props.card && props.card.map((card_, index) => (
          <Panel header={`Список задач: ${card_.name}`} key={card_.id}>
            <p>Описание: {card_.description}</p>
            <TaskCollapse card={card_.id} fetchBoardData={props.fetchBoardData} />
          </Panel>
        ))}
      </Collapse>
      <div><h1></h1></div>
      {userStatus !== 'worker' && (
        <div>
          <Button type="primary" onClick={() => deliteBoard()}>Удалить проект</Button>
        </div>
      )}
      <Modal
        visible={deleteBoardModalVisible}
        title="Удаление проекта"
        okText="Удалить"
        cancelText="Отмена"
        onOk={confirmDeleteBoard}
        onCancel={cancelDeleteBoard}
      >
        <p>Вы уверены, что хотите удалить проект?</p>
      </Modal>
      <Modal
      visible={modalCardActive}
      onCancel={handleCancel}
      footer={null}
      centered
      maskClosable={true}
      closable={false}
    >
      <AddCardCollapse boardId={boardId} onCardCreated={handleCardCreated} />
    </Modal>
    </div>
  );

};

export default CardCollapse;