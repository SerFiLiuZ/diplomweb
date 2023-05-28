import { Badge, Calendar } from 'antd';
import Manager from 'C:/Users/User/Desktop/DiplomWEB/diplomweb/src/API/Maneger';
import { useEffect, useState } from 'react';
import '../CSS/calendar.css'

const App = () => {
  const [listData, setListData] = useState([]);
  const [calendarData, setCalendarData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const response = await Manager.getAllTasks();
    setListData(response);
  };
  
  useEffect(() => {
    if (listData.length > 0) {
      const data = getListData();
      setCalendarData(data);
    }
  }, [listData]);
  
  const getListData = () => {
    const data = listData.map((item) => {
      let type = 'info';
  
      if (item.task_color === '#14D100') {
        type = 'success';
      } else if (item.task_color === '#E2FA00') {
        type = 'warning';
      } else if (item.task_color === '#FB000D') {
        type = 'error';
      }
  
      return {
        type,
        content: item.name,
        date: new Date(item.due_date),
      };
    });
  
    return data;
  };
  
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
    return null;
  };

  const monthCellRender = (value) => {
    return null
  };

  const dateCellRender = (value) => {
    const filteredData = calendarData.filter((item) => {
      const itemDueDate = new Date(item.date);
      const valueDate = new Date(value.year(), value.month(), value.date());
      return (
        itemDueDate.getFullYear() === valueDate.getFullYear() &&
        itemDueDate.getMonth() === valueDate.getMonth() &&
        itemDueDate.getDate() === valueDate.getDate()
      );
    });
  
    if (filteredData.length > 0) {
      return (
        <ul className="events">
          {filteredData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    }
  
    return null;
  };
  

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      {calendarData && calendarData.length > 0 ? (
        <Calendar cellRender={cellRender} />
      ) : (
        <Calendar />
      )}
    </div>
  );
  
};

export default App;
