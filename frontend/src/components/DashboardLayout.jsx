import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AuthenticatedLayout from "./Dashboard/AuthenticatedLayout";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios";
import Users from "../views/Dashboard/users/Users";
import { Helmet } from "react-helmet";

export default function DashboardLayout() {
    const { currentUser, userToken, setCurrentUser } = useStateContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    if (!userToken) {
      return <Navigate to="/" />;
    }

    useEffect(() => {
      axiosClient
        .get('/me')
        .then(({ data }) => {
          console.log(data);
          setCurrentUser(data);

          if (data.status === 'client') {
            console.log('User is a client');
            // Redirect the user to a different page, e.g., a client dashboard
            navigate('/');
          } else {
            console.log('User is not a client');
          }
          console.log(currentUser);

          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    }, []);

    if (isLoading) {
      return <div>Loading...</div>;
    }



    return (
      <div>
        <Helmet>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard" />
            </Helmet>
        <Outlet user={currentUser} />
      </div>
    );
  }
