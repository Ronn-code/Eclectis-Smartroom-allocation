import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - Management


const User = Loadable(lazy(() => import('pages/component-overview/User')));
const Resources = Loadable(lazy(() => import('pages/component-overview/Resources')));
const Rooms = Loadable(lazy(() => import('pages/component-overview/Rooms')));
const AddUser = Loadable(lazy(() => import('pages/component-overview/AddUser')));
const AddRoom = Loadable(lazy(() => import('pages/component-overview/AddRoom')));
const AddResource = Loadable(lazy(() => import('pages/component-overview/AddResource')));
const EditUser = Loadable(lazy(() => import('pages/component-overview/EditUser')));
const EditRoom = Loadable(lazy(() => import('pages/component-overview/EditRoom')));
const EditResource = Loadable(lazy(() => import('pages/component-overview/EditResource')));
const ViewUser = Loadable(lazy(() => import('pages/component-overview/ViewUser')));
const ChangePwdA = Loadable(lazy(() => import('pages/component-overview/ChangePwdA')));
const ViewProfileAdmin = Loadable(lazy(() => import('pages/component-overview/ViewProfileAdmin')));
// render - sample page
const Settings= Loadable(lazy(() => import('pages/extra-pages/Settings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'settings',
      element: <Settings />
    },
    {
      path: 'user',
      element: <User />
    },
    {
      path: 'rooms',
      element: <Rooms/>
    },
    {
      path: 'resources',
      element: <Resources/>
    },
    {
      path: 'adduser',
      element: <AddUser/>
    },
    {
      path: 'addroom',
      element: <AddRoom/>
    },
    {
      path: 'addresource',
      element: <AddResource/>
    },
    {
      path: 'edituser/:userid',
      element: <EditUser/>
    },
    {
      path: 'editroom/:roomid',
      element: <EditRoom/>
    },
    {
      path: 'editresource/:equipmentid',
      element: <EditResource/>
    },
    {
      path: 'viewuser/:userid',
      element: <ViewUser/>
    },
    {
      path:'change/password',
      element: <ChangePwdA/>
    },
    {
      path:'view/profile',
      element: <ViewProfileAdmin/>
    }
  ],

};

export default MainRoutes;
