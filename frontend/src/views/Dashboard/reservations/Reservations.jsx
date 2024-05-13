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
import SentToEmployeModel from './SendToEmploye';

export default function Reservations(user) {
    const [reservations, setReservations] = useState([]);
    const [queryParams, setQueryParams] = useState({ status: '' });
    const [showDialog, setShowDialog] = useState(false);
    const [showReserv, setShowReserv] = useState(false);
    const [showEditReserv, setShowEditReserv] = useState(false);
    const [showEmployeeSelect, setShowEmployeeSelect] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [employeItemId, setEmployeItemId] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const searchFieldChanged = (name, value) => {
        setQueryParams(prevParams => ({
            ...prevParams,
            [name]: value,
        }));
    };

    useEffect(() => {
        getEmployees();
        fetchData();
    }, [queryParams]);


    useEffect(() => {
        getEmployees();
    }, []);


    const fetchData = () => {
        axiosClient.get('/reservations', { params: queryParams })
            .then(({ data }) => {
                if(data.success){
                    setReservations(data.reservations);
                }

            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    };

    const getEmployees = () => {
        axiosClient.get('/employees')
            .then(({ data }) => {
                    setEmployees(data);

            })
            .catch(error => {
                console.error('Error fetching reservations:', error);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchData();
    };


    const handleDelete = async (id) => {


        try {
            const response = await axiosClient.delete(`/reservations/${id}`);

            if (response.data.success) {
                setShowDialog(false);
                setDeleteItemId(null);
                setSuccessMessage(response.data.message);
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            // Handle error or display error message
        } finally {
            fetchData();
        }
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


    const handeAddEmployeToReservation = async (reservationId, employeeId) => {


        try {
            const response = await axiosClient.post(`/reservations/${reservationId}/employees/${employeeId}`);
            if (response.data.success) {
                setShowEmployeeSelect(false);
                setEmployeItemId(null);
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
        setDeleteItemId(id);
        setShowReserv(true);
    };

    const closeShowReservation = () => {
        setShowReserv(false);
        setDeleteItemId(null);
    };

    const openConfirmationDialog = (id) => {
        setDeleteItemId(id);
        setShowDialog(true);
    };

    const closeConfirmationDialog = () => {
        setShowDialog(false);
        setDeleteItemId(null);
    };

    const openEditModel = (id) => {
        setEditItemId(id);
        setShowEditReserv(true);
    };


    const openEmployeeModel = (id) => {
        setEmployeItemId(id);
        setShowEmployeeSelect(true);
    };

    const closeEditModel = () => {
        setShowEditReserv(false);
        setEditItemId(null);
    };
    const closeEmployeeModel = () => {
        setShowEmployeeSelect(false);
        setEmployeItemId(null);
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
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black ">
                                    Employee
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
                                        {reservation.employee ?
                                        (<p className="text-black dark:text-white">
                                            {reservation.employee.name}
                                        </p>)
                                          : (
                                            <button onClick={() => openEmployeeModel(reservation.id)}>
                                                <HiUserAdd className='w-[18px] h-[18px]' />
                                            </button>

                                        )}
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
                                            <button onClick={() => openConfirmationDialog(reservation.id)} className="hover:text-primary">
                                                <svg
                                                    className="fill-current"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                        fill=""
                                                    />
                                                    <path
                                                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                        fill=""
                                                    />
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
                        itemId={deleteItemId}
                    />
                    <DialogConfirmation
                        showModal={showDialog}
                        onClose={closeConfirmationDialog}
                        onDelete={handleDelete}
                        itemId={deleteItemId}
                    />
                    <EditReservation
                        showModal={showEditReserv}
                        onClose={closeEditModel}
                        onUpdate={handleEdit}
                        itemId={editItemId}
                    />
                    <SentToEmployeModel
                        showModal={showEmployeeSelect}
                        onClose={closeEmployeeModel}
                        onUpdate={handeAddEmployeToReservation}
                        itemId={employeItemId}
                        employees={employees}
                    />
                    <SuccessModal message={successMessage} showModal={showModal} onClose={handleCloseModal} />

                </div>

            </div>

        </AuthenticatedLayout>



    );
}

