import React, { useState,useEffect } from 'react'
import { Tabs, Banner, Badge, Button } from "flowbite-react";
import { GiSandsOfTime } from "react-icons/gi";
import { FaHistory, FaTrashAlt } from "react-icons/fa";
import { RiCarWashingFill } from "react-icons/ri";
import { HiClock } from "react-icons/hi";
import axiosClient from '../../../axios';
import DialogConfirmation from '../../../components/Dashboard/DialogConfirmation';
import SuccessModal from '../../../components/Dashboard/DialogComponent';
import StatusBadge from '../../../components/StatusBadge';
import { Helmet } from 'react-helmet';






const MesCommandes = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [upcomingReservations, setUpcomingReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);


    const handleDelete = async (id) => {


        try {
            const response = await axiosClient.delete(`/reservations/${id}`);
            setShowDialog(false);
            setDeleteItemId(null);
            setSuccessMessage(response.data.message);
            setShowModal(true);
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error or display error message
        } finally {
            console.error('false');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('');
        window.location.reload();
    };

    const openConfirmationDialog = (id) => {
        setDeleteItemId(id);
        setShowDialog(true);
    };

    const closeConfirmationDialog = () => {
        setShowDialog(false);
        setDeleteItemId(null);
    };

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axiosClient.get('/commandes');
                if (response.data.success) {
                    setUpcomingReservations(response.data.upcomingReservations);
                    setPastReservations(response.data.pastReservations);
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);
    return (
        <div className="flex flex-col items-start mt-20 max-w-screen-xl mx-auto py-6  sm:px-6">
            <Helmet>
                <title>Mes Commandes</title>
                <meta name="description" content="Mes Commandes" />
            </Helmet>
            <h1 className='text-gray-700 text-2xl my-4'>Mes Commandes</h1>
            <Tabs aria-label="Full width tabs" style="fullWidth">

                <Tabs.Item title="À Venir" icon={GiSandsOfTime}>
                {upcomingReservations.length > 0 ? (upcomingReservations.map((reservation,key) =>(
                <Banner key={key}>
                    <div className="flex w-[100%] flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm  md:flex-row lg:max-w-7xl">
                        <div className="mb-3 mr-4 flex gap-3 flex-col items-start  md:mb-0 md:flex-row md:items-center">
                            <RiCarWashingFill className="mr-2 h-20 w-20" />
                            <div className="flex flex-col w-[50vh]  gap-2 ">
                                <p className="text-xl font-normal text-gray-700 ">{reservation.service.name} - {reservation.service.price} </p>

                                <div className='flex flex-wrap mt-2'>
                                    <Badge color="gray" icon={HiClock}>
                                    {reservation.reservation_date}
                                    </Badge>
                                </div>

                                <StatusBadge status={reservation.status}/>

                            </div>

                        </div>
                        {reservation.status === 'En attente'? <div className="flex shrink-0 items-center ">
                            <Button onClick={() => openConfirmationDialog(reservation.id)}  color="gray" className="border-0 bg-transparent text-gray-500 ">
                                <FaTrashAlt className="h-4 w-4" />
                            </Button>
                        </div> : null}
                    </div>
                </Banner>
                ))):(<div><p className="text-xl font-normal text-gray-700 ">Aucun commandes trouvé.. </p></div> )}

                </Tabs.Item>
                <Tabs.Item title="Passé" icon={FaHistory}>
                {pastReservations.length > 0 ? (pastReservations.map((reservation,key) =>(
                <Banner key={key}>
                    <div className="flex w-[100%] flex-col justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm  md:flex-row lg:max-w-7xl">
                        <div className="mb-3 mr-4 flex gap-3 flex-col items-start  md:mb-0 md:flex-row md:items-center">
                            <RiCarWashingFill className="mr-2 h-20 w-20" />
                            <div className="flex flex-col w-[50vh]  gap-2 ">
                                <p className="text-xl font-normal text-gray-700 ">{reservation.service.name} - {reservation.service.price}<span className='text-sm' >/Dh</span>  </p>

                                <div className='flex flex-wrap'>
                                    <Badge color="gray" icon={HiClock}>
                                    {reservation.reservation_date}
                                    </Badge>
                                </div>
                                <StatusBadge status={reservation.status}/>

                            </div>

                        </div>
                    </div>
                </Banner>
                ))) :(<div><p className="text-xl font-normal text-gray-700 ">Aucun commandes trouvé.. </p></div> )}
                </Tabs.Item>
            </Tabs>
            <DialogConfirmation
                showModal={showDialog}
                onClose={closeConfirmationDialog}
                onDelete={handleDelete}
                itemId={deleteItemId}
            />
            <SuccessModal message={successMessage} showModal={showModal} onClose={handleCloseModal} />
        </div>
    )
}

export default MesCommandes
