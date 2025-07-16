import { lazy } from 'react';

// project imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';



// jwt auth
const Lecturer = Loadable(lazy(() => import('pages/component-overview/Lecturer')));
const AddBooking = Loadable(lazy(() => import('pages/component-overview/AddBooking')));
const MyBookings = Loadable(lazy(() => import('pages/component-overview/MyBookings')));
const AllRooms = Loadable(lazy(() => import('pages/component-overview/AllRooms')));
const LecSettings = Loadable(lazy(() => import('pages/component-overview/LecSettings')));


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
        }
      ]
    }
  ]
};

export default LecturerRoutes;