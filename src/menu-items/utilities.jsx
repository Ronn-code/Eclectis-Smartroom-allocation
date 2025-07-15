// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  UserOutlined,
  ToolOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  UserOutlined,
  ToolOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Management',
  type: 'group',
  children: [
     {
      id: 'user',
      title: 'Users',
      type: 'item',
      url: '/user',
      icon: icons.UserOutlined
    },
    {
      id: 'rooms',
      title: 'Rooms',
      type: 'item',
      url: '/rooms',
      icon: icons.AppstoreAddOutlined
    },
    {
      id: 'recources',
      title: 'Equipments',
      type: 'item',
      url: '/resources',
      icon: icons.ToolOutlined
    }
  ]
};

export default utilities;
