import { lazy } from 'react';

// project imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';



// jwt auth
const Lecturer = Loadable(lazy(() => import('pages/component-overview/Lecturer')));
const AddBooking = Loadable(lazy(() => import('pages/component-overview/AddBooking')));
const RecurrBooking = Loadable(lazy(() => import('pages/component-overview/RecurrBooking')));
const MyBookings = Loadable(lazy(() => import('pages/component-overview/MyBookings')));
const AllRooms = Loadable(lazy(() => import('pages/component-overview/AllRooms')));
const LecSettings = Loadable(lazy(() => import('pages/component-overview/LecSettings')));
const ViewProfileStaff = Loadable(lazy(() => import('pages/component-overview/ViewProfileStaff')));
const ChangePwdL = Loadable(lazy(() => import('pages/component-overview/ChangePwdL')));
const Cancel = Loadable(lazy(() => import('pages/component-overview/Cancel')));

// ==============================|| AUTH ROUTING ||============================== //

const LecturerRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: '/lecturer',
          element: <Lecturer />
        },
        {
          path: "/addbooking/:roomid",
          element: <AddBooking/>
        },
        {
          path: "/recurring/booking/:roomid",
          element: <RecurrBooking/>
        },
        {
          path: '/mybookings',
          element: <MyBookings/>
        },
         {
          path: '/mybookings',
          element: <MyBookings/>
        },
        {
          path: '/allrooms',
          element: <AllRooms/>
        },
        {
          path: '/lecsettings',
          element: <LecSettings/>
        },
        {
          path:'view/profile/staff',
          element: <ViewProfileStaff/>
        },
        {
          path:'change/pwd',
          element: <ChangePwdL/>
        },
        {
          path: 'cancel/booking',
          element: <Cancel/>
        }
      ]
    }
  ]
};

export default LecturerRoutes;