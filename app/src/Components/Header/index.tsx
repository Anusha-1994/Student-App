import React from 'react';
import { Layout, Typography, Modal } from 'antd';
import { LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import OrganizationImage from '../../Assets/Images/Image.jpeg';
import './Header.less';
import Constant from '../../Global/Constant';
import { useHistory } from 'react-router-dom';
import Routes from '../../Global/Routes';



function Header() {
  
  return (
    <Layout.Header id="header" className="px-4">
      <Layout.Content className="d-flex justify-content-between">
        <Typography.Text strong>
          <img src={OrganizationImage} className="mr-3" height={40} alt="" />
          {Constant.applicationName}
        </Typography.Text>
        <div className="d-flex align-items-center">
        </div>
      </Layout.Content>
    </Layout.Header>
  );
}

export default Header;
