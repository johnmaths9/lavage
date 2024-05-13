import { Link } from "react-router-dom";
import AuthenticatedLayout from "../../../components/Dashboard/AuthenticatedLayout";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios";
import DialogConfirmation from "../../../components/Dashboard/DialogConfirmation";
import SuccessModal from "../../../components/Dashboard/DialogComponent";

export default function Services(user) {
    const [services, SetServices] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        axiosClient.get('/services').then(({ data }) => {
            SetServices(data)
        });

    }, []);

    const handleDelete = async (id) => {


        try {
            const response = await axiosClient.delete(`/services/${id}`);
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
            console.error('false');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('');
        window.location.reload();
    };

    const openConfirmationDialog = (id) => {
        setDeleteItemId(id); // Set the id of the item to delete
        setShowDialog(true); // Show the confirmation dialog
    };

    const closeConfirmationDialog = () => {
        setShowDialog(false); // Close the confirmation dialog
        setDeleteItemId(null); // Reset the deleteItemId state
    };
    return (
        <AuthenticatedLayout

            user={user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Services
                    </h2>
                    <Link
                        to='/services/create'
                        className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    >
                        Ajouter un nouveau
                    </Link>
                </div>
            }
        >
            <section className="bg-whit" id="services">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0">

                        {services.map((service, key) => (
                            <div key={key} className="flex justify-between flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                                <h3 className="mb-4 text-2xl font-semibold">{service.name}</h3>
                                <div className="block relative h-40 xs:h-48 md:h-40 w-full p-4">
                                    <img className="absolute h-full w-full left-0 top-0 right-0 bottom-0 " src={`http://127.0.0.1:8000${service.image}`} alt="" />
                                </div>

                                <div className="flex justify-center items-baseline my-8">
                                    <span className="mr-2 text-xl font-extrabold">{service.price} MAD</span>
                                </div>
                                {/* List */}
                                <ul role="list" className="mb-8 space-y-4 text-left min-w-[200px]">
                                    {service.features?.map((feature) => (
                                        <li className="flex items-center space-x-3">
                                            {/* Icon */}
                                            <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}

                                </ul>

                                <div className="flex justify-center gap-3">
                                    <Link style={{'style':'none'}} to={`/services/edit/${service.id}`}>
                                    <button className="hover:text-primary">
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
                                    </Link>

                                    <button onClick={() => openConfirmationDialog(service.id)} className="hover:text-primary">
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

                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <DialogConfirmation
                showModal={showDialog}
                onClose={closeConfirmationDialog}
                onDelete={handleDelete}
                itemId={deleteItemId}
            />
            <SuccessModal message={successMessage} showModal={showModal} onClose={handleCloseModal} />
        </AuthenticatedLayout>
    );
}
