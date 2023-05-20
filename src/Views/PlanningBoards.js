import React, { useCallback, useEffect, useState } from 'react';
import Manager from '../API/Maneger';
import BoardsCollapse from '../Components/BoardsCollapse';

function PlanningBoards() {
  const [boards, setBoards] = useState([]);

  const fetchBoards = useCallback(async () => {
    try {
      const response = await Manager.getAllBoards();
      setBoards(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async (title) => {
    try {
      await Manager.createBoard(title);
      fetchBoards(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ height: '100%', minHeight: '100vh' }}>
      <BoardsCollapse boards={boards} onBoardCreated={handleCreateBoard} fetchBoards={fetchBoards} />
    </div>
  );
}

export default PlanningBoards;