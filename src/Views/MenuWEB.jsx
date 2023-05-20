import { LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme, Modal, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import PlanningBoards from "./PlanningBoards";
import TableWorkers from "./TableWorkers";
import Applications from "./Applications";
import General from "C:/Users/User/Desktop/DiplomWEB/diplomweb/src/Views/General";
import Cookies from 'js-cookie';
import "../App.css"
import Manager from 'C:/Users/User/Desktop/DiplomWEB/diplomweb/src/API/Maneger';


const { Header, Content, Sider } = Layout;
const { Text, Title } = Typography;

const userStatus = Cookies.get('user_status');

let items1 = [];
if (userStatus === "manager") {
  items1 = ['Главная', 'Проекты', 'Работники', 'Заявки'];
} else {
  items1 = ['Главная', 'Проекты'];
}

const pageTitles = ['страница самая главная', 'страница всех проектов', 'страница всех работников', 'страница всех заявочек'];

const MenuWEB = ({ setIsLoggedIn }) => {
  const [modalExitActive, setModalExitActive] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(items1[0]);
  const [activeComponent, setActiveComponent] = useState('0');
  const [nameCorp, setNameCorp] = useState('');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    Cookies.remove('user_status');
    Cookies.remove('fillin');
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleMenuSelect = ({ key }) => {
    setSelectedMenuItem(items1[key]);
    setActiveComponent(String(key));
  };

  useEffect(() => {
    getNameCorp();
  }, []);

  
  const getNameCorp = async () => {
    try {
      const response = await Manager.GetNameCorp();
      setNameCorp(response.nameCorp);
    } catch (error) {
      console.log(error);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case '0':
        return <General />;
      case '1':
        return <PlanningBoards />;
      case '2':
        return <TableWorkers />;
      case '3':
        return <Applications />;
      default:
        return null;
    }
  };

  return (  
    <div>
      <Layout>
      <Header className="header" style={{ display: 'flex', justifyContent: 'space-between', background: "#1c1404" }}>
  <div>
    <Title level={2} style={{ color: 'white', marginTop: 11 }}>
      DTask
    </Title>
  </div>
  <div>
    <Title level={2} style={{ color: 'white', marginTop: 11 }}>
      {nameCorp}
    </Title>
  </div>
  <div>
    <div onClick={() => setModalExitActive(true)} style={{ fontSize: '20px', color: '#aaa' }}>
      <LogoutOutlined />
    </div>
  </div>
</Header>

        <Layout>
          <Sider width={200} style={{ background: "#eecd8a" }}>
            <Menu
              theme=""
              mode="vertical"
              defaultSelectedKeys={['0']}
              selectedKeys={[selectedMenuItem]}
              onClick={handleMenuSelect}
            >
              {items1.map((item, index) => (
                <Menu.Item key={index}>{item}</Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px', background: "#d4c0b6" }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{pageTitles[items1.indexOf(selectedMenuItem)]}</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ padding: 24, margin: 0, minHeight: 280, background: colorBgContainer }}>
              {renderComponent()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Modal
        title="Выход"
        visible={modalExitActive}
        onCancel={() => setModalExitActive(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalExitActive(false)}>
            Отмена
          </Button>,
          <Button key="logout" type="primary" onClick={handleLogout}>
            Выйти
          </Button>,
        ]}
      >
        <Text>Вы действительно хотите выйти?</Text>
      </Modal>
    </div>

  );
};

export default MenuWEB;

