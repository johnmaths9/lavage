import TableHeading from '../../../components/Dashboard/TableHeading'
import TextInput from '../../../components/Dashboard/TextInput'
import AuthenticatedLayout from '../../../components/Dashboard/AuthenticatedLayout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosClient from '../../../axios';
import DialogConfirmation from '../../../components/Dashboard/DialogConfirmation';
import SuccessModal from '../../../components/Dashboard/DialogComponent';
import ShowReservation from './ShowReservation';
import EditReservation from './EditReservation';
import StatusBadge from '../../../components/StatusBadge';
import { HiUserAdd } from "react-icons/hi";

export default function ReservationsForEmploye(user) {
    const [reservations, setReservations] = useState([]);
    const [queryParams, setQueryParams] = useState({ status: '' });
    const [showReserv, setShowReserv] = useState(false);
    const [showEditReserv, setShowEditReserv] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [ItemId, setItemId] = useState(null);

    const searchFieldChanged = (name, value) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchData();
    }, [queryParams]);




    const fetchData = () => {
        axiosClient.get('/getReservationsForEmployee', { params: queryParams })
            .then(({ data }) => {
                if(data.success){
                    setReservations(data.reservations);
                }

            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    };



    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };



    const handleEdit = async (id, status) => {


        try {
            const response = await axiosClient.post(`/reservations/edit/${id}`, { status });
            if (response.data.success) {
                setShowEditReserv(false);
                setEditItemId(null);
                setSuccessMessage(response.data.message);
                setShowModal(true);
                fetchData();
            }
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
    };

    const handleCloseEditModal = () => {
        setShowModal(false);
        setSuccessMessage('');
        window.location.reload();
    };

    const handleCloseShowReservation = () => {
        setShowReserv(false);
    };

    const openShowReservation = (id) => {
        console.log(id);
        setItemId(id);
        setShowReserv(true);
    };

    const closeShowReservation = () => {
        setShowReserv(false);
        setItemId(null);
    };



    const openEditModel = (id) => {
        setEditItemId(id);
        setShowEditReserv(true);
    };



    const closeEditModel = () => {
        setShowEditReserv(false);
        setEditItemId(null);
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Reservations
                    </h2>

                </div>
            }
        >

            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-7xl mx-auto overflow-x-auto">
                    <div className='flex flex-col sm:flex-row items-center p-4 gap-3 w-full'>
                        <form onSubmit={handleSearch} className='w-full'>
                            <div className='flex flex-col sm:flex-row gap-3 mb-4 sm:mb-0'>
                                <select
                                    name="status"
                                    value={queryParams.status}
                                    onChange={(e) => searchFieldChanged('status', e.target.value)}
                                    className='mt-1 lg:w-64 xl:w-96 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2.5 text-sm'
                                >
                                    <option value="">Choisir le statut</option>
                                    <option value="En attente">En attente</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Terminée">Terminée</option>
                                </select>
                                <button type="submit" className='mt-1 lg:w-24 xl:w-32 bg-emerald-500 py-2.5 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm'>Search</button>
                            </div>
                        </form>

                    </div>



                    <table className="w-full table-auto">
                        <thead>
                            <tr className=" text-left bg-[#EDE7E7] dark:bg-meta-4">
                                <th className="min-w-[220px] py-4 px-4 font-medium text-black  xl:pl-11">
                                    ID
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                                    Client
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                                    Service
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                                    Prix
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                                    Statut
                                </th>
                                <th className="py-4 px-4 font-medium text-black ">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((reservation, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {reservation.id}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {reservation.user.name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {reservation.service.name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {reservation.service.price}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            <StatusBadge status={reservation.status} />

                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <button onClick={() => openShowReservation(reservation.id)} className="hover:text-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    version="1.1"
                                                    viewBox="0 0 32 32"
                                                    xmlSpace="preserve"
                                                >
                                                    <path fill="none" d="M0 0H32V32H0z"></path>
                                                    <g>
                                                        <circle cx="16" cy="16" r="6"></circle>
                                                        <path d="M16 6C6 6 0 15.938 0 15.938S6 26 16 26s16-10 16-10S26 6 16 6zm0 18c-8.75 0-13.5-8-13.5-8S7.25 8 16 8s13.5 8 13.5 8-4.75 8-13.5 8z"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                            <button onClick={() => openEditModel(reservation.id)} className="hover:text-primary">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    className="feather feather-edit"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ShowReservation
                        showModal={showReserv}
                        onClose={closeShowReservation}
                        itemId={ItemId}
                    />
                    <EditReservation
                        showModal={showEditReserv}
                        onClose={closeEditModel}
                        onUpdate={handleEdit}
                        itemId={editItemId}
                    />
                    <SuccessModal message={successMessage} showModal={showModal} onClose={handleCloseModal} />

                </div>

            </div>

        </AuthenticatedLayout>



    );
}

