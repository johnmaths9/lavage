import { Navigate, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import GuestLayout from "../components/GuestLayout";
import HomeLayout from "../components/HomeLayout";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import Signup from "../views/Signup";
import NotFoundPage from "../views/404";
import Profile from "../views/Website/Profile/Profile";
import Users from "../views/Dashboard/users/Users";
import Create from "../views/Dashboard/users/Create";
import Edit from "../views/Dashboard/users/Edit";
import EditUser from "../views/Dashboard/users/Edit";
import Services from "../views/Dashboard/services/Services";
import CreateService from "../views/Dashboard/services/Create";
import Editervice from "../views/Dashboard/services/Edit";
import Reservation from "../views/Website/Reservation/Reservation";
import Reservations from "../views/Dashboard/reservations/Reservations";
import MesCommandes from "../views/Website/MesCommandes/MesCommandes";
import Contacts from "../views/Dashboard/Contacts/Contacts";
import ReservationsForEmploye from "../views/Dashboard/reservationsForEmployee/Reservations";

const useAuth = () => {
    const userRole = localStorage.getItem('status');
    return userRole;
};

const router = createBrowserRouter([

    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/mescommandes',
                element: <MesCommandes />,
            },
            {
                path: '/reservation/:token',
                element: <Reservation />,
            },
        ],
    },
    {
        path: '/',
        element: (
            useAuth() !== 'client' ? <DashboardLayout /> : <Navigate to="/not-found" replace={true} />
        ),
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/reservations',
                element: useAuth() === 'admin' ? <Reservations /> : <ReservationsForEmploye />  ,
            },
            {
                path:'/',
                element: useAuth() === 'admin' ? <DashboardLayout /> : <Navigate to="/dashboard" replace={true} />,
                children:[
                    {
                        path: '/users',
                        element: <Users />,
                    },
                    {
                        path: '/users/create',
                        element: <Create />,
                    },
                    {
                        path: "/users/edit/:id",
                        element: <EditUser />,
                    },
                    {
                        path: "/services",
                        element: <Services />,
                    },
                    {
                        path: "/services/create",
                        element: <CreateService />,
                    },
                    {
                        path: "/services/edit/:id",
                        element: <Editervice />,
                    },
                ]
            },
            {
                path: "/contacts",
                element: <Contacts />,
            },
        ],
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
        ],
    },
    {
        path: '/not-found',
        element: <NotFoundPage />,
    },
    {
        path: '*',
        element: <Navigate to="/not-found" replace />,
    },
]);

export default router;
