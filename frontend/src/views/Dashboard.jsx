import {  Link } from 'react-router-dom';
import AuthenticatedLayout from "../components/Dashboard/AuthenticatedLayout";
import { useEffect, useState } from 'react';
import axiosClient from '../axios';
import { Helmet } from 'react-helmet';


export default function Dashboard(user) {

    const [pendingReservation, setPendingReservation] = useState(null);
  const [inProgressReservation, setInProgressReservation] = useState(null);
  const [completedReservation, setCompletedReservation] = useState(null);
  const [total,SetTotal] = useState(0)

  useEffect(() => {
    axiosClient.get('/dashboard/status')
      .then(response => {
        setPendingReservation(response.data.reservations['En attente']);
        setInProgressReservation(response.data.reservations['En cours']);
        setCompletedReservation(response.data.reservations['Terminée']);
        SetTotal(response.data.total)
      })
      .catch(error => {
        console.error('Error fetching task counts:', error);
      });
  }, []);


    return (
        <AuthenticatedLayout
          user={user}
          header={
            <h2 className="font-semibold text-xl text-gray-800  leading-tight">
              Dashboard
            </h2>
          }
        >

<Helmet>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard" />
            </Helmet>

<div>
          {/*<Head title="Dashboard" />*/}

          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-2">
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-amber-500 text-2xl font-semibold">
                    Réservations en attente
                  </h3>
                  <p className="text-xl mt-4">
                    <span className="mr-2">{pendingReservation}</span>/
                    <span className="ml-2">{total}</span>
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-blue-500 text-2xl font-semibold">
                  Réservations en cours
                  </h3>
                  <p className="text-xl mt-4">
                    <span className="mr-2">{inProgressReservation}</span>/
                    <span className="ml-2">{total}</span>
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <h3 className="text-green-500 text-2xl font-semibold">
                  Réservations terminées
                  </h3>
                  <p className="text-xl mt-4">
                    <span className="mr-2">{completedReservation}</span>/
                    <span className="ml-2">{total}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
         </div>

        </AuthenticatedLayout>

      );
    }
