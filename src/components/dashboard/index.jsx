import { useState } from "react";

import { Link } from "react-router-dom";
import { Layout, Menu, Switch } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Sider, Footer, Content } = Layout;

const Dashboard = ({ children }) => {
  
  const [collapsed, setCollapsed] = useState(false);
  const[theme, setTheme] = useState('light');

  const toggle = () => setCollapsed(!collapsed);  
  var changeTheme = value => {
      value ? setTheme('dark') : setTheme('light');
  };

  return (
    <Layout style={{ minHeight: '100vh' }} >
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggle}
      className={theme==='dark'? "ant-layout-sider-dark": "ant-layout-sider-light"}
    >
      <div className="logo" > ARSA </div>
      <Menu         
        defaultSelectedKeys={['1']}
        mode="inline">
        <Menu.Item key="1">
          <UserOutlined />
          <span>Clientes</span>
        </Menu.Item>       
      </Menu>     
    </Sider>
    <Layout>      
      <Content 
        style={{
          margin: "24px 16px",
          padding: 40,
          minHeight: 280,
        }}
      >
        { children }
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Jair Arteaga ©2022 - Marzo
      </Footer>
    </Layout>
  </Layout>

  );
};

export default Dashboard;
