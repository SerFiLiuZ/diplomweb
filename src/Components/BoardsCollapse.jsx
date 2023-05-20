import { Collapse, Space } from 'antd';
import Manager from 'C:/Users/User/Desktop/DiplomWEB/diplomweb/src/API/Maneger'; // Убедитесь, что путь импорта указан корректно
import React, { useState, useEffect } from 'react';
import CardCollapse from '../Components/CardCollapse';
import { Button } from 'antd';
import { Modal } from "antd";
import AddBoardCollapse from './AddBoardsCollapse';
import Cookies from 'js-cookie';


const { Panel } = Collapse;

const BoardsCollapse = (props) => {
  const [boardData, setBoardData] = useState([]);
  const [boardDataLoaded, setBoardDataLoaded] = useState(false);
  const [modalBoardActive, setModalBoardActive] = useState(false);

  const fetchBoardData = async () => {
    const promises = props.boards.map((board) => Manager.getBoardById(board.id));
    const data = await Promise.all(promises);
    setBoardData(data);
    setBoardDataLoaded(true);
  };

  useEffect(() => {
    fetchBoardData();
  }, [props.boards]);

  const userStatus = Cookies.get('user_status');

  const handleCancel = () => {
    setModalBoardActive(false);
  };
   
  
  return (
    <div >
      {userStatus !== 'worker' && (
        <div>
          <Button type="primary" onClick={() => setModalBoardActive(true)}>
            Создать новый проект
          </Button>
        </div>
      )}
      <div>
      <Space direction="vertical" style={{ width: '100%', marginBottom: '20px' }}>
      <Collapse>
        {props.boards && props.boards.map((board, index) => (
          <Panel header={`Проект: ${board.title}`} key={board.id}>
            <CardCollapse
              card={boardData[index]}
              boardId={board.id}
              onBoardDeleted={props.fetchBoards} 
              fetchBoardData={fetchBoardData} // Pass the fetchBoardData function as prop
            />
          </Panel>
        ))}
      </Collapse>
    </Space>
      </div>
      <Modal
        visible={modalBoardActive}
        onCancel={handleCancel}
        footer={null}
        centered
        maskClosable={true} // Set maskClosable to true
        closable={false}
      >
        <AddBoardCollapse onBoardCreated={props.onBoardCreated} />
      </Modal>
    </div>
  );
};

export default BoardsCollapse;