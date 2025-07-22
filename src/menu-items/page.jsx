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
  title: 'Role',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'ADMIN',
      type: 'item',
      url: '/view/profile',
      icon: icons.BankOutlined,
    
    },
    
  ]
};

export default pages;
