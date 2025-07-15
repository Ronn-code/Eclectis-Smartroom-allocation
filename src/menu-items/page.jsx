// assets
import { LoginOutlined, ProfileOutlined, BankOutlined, } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  BankOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Organization',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'Departments',
      type: 'item',
      url: '/login',
      icon: icons.BankOutlined,
      target: true
    },
    
  ]
};

export default pages;
