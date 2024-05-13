import React, { useState, useEffect } from 'react';
import { MapPinIcon, TruckIcon, CalendarIcon } from '@heroicons/react/24/outline';
import Location from './Location';
import DateForm from './DateForm';
import CarForm from './Carform';

import axiosClient from '../../../axios';
import { Navigate, useParams,useNavigate } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import SuccessModal from '../../../components/Dashboard/DialogComponent';
import { Helmet } from 'react-helmet';

const Reservation = () => {
    const navigate = useNavigate()
    const [service, setService] = useState({});
    const { token } = useParams();
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        activeStep: 1,
        car: {
            make: '',
            model: '',
            year: '',
            license_plate: '',
        },
        location: {
            location: '',
            latitude: '',
            longitude: '',
        },
        reservation: {
            reservation_date: '',
        },
    });

    const {  userToken } =
    useStateContext();
    const [error, setError] = useState({ __html: "" });

    if (!userToken) {
        return <Navigate to="/login" />;
      }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            car: {
                ...formData.car,
                [name]: value,
            },
        });
    };

    const handleLocationChange = (locationData) => {
        setFormData({
            ...formData,
            location: locationData.location,
            activeStep: 3,
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('');
        navigate('/mescommandes')
      };

    const handleDateSubmit = async  (reservationData) => {
        setFormData({
            ...formData,
            reservation: reservationData.reservation,
        });

        console.log(reservationData.reservation.reservation_date + "didi");
        handleSubmit();
    };



    const handleSubmit = async (e,reservationData) => {
        e.preventDefault();
        setLoading(true);
        try {

            console.log(formData);
            const response = await axiosClient.post('/reservations', {
                ...formData,
                reservation: reservationData.reservation,
                service_id: service.id,
            });
            if(response.data.success){
                setSuccessMessage(response.data.message);
                setShowModal(true);
            }

        } catch (error) {
            if (error.response) {
                const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
                console.log(finalErrors);
                setError({ __html: finalErrors.join('<br>') });
            } else {
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        axiosClient.get(`/service/${token}`).then(({ data }) => {
            setService(data);
        });
    }, [token]);

    const renderForm = () => {
        const { activeStep } = formData;
        switch (activeStep) {
            case 1:
                return <CarForm formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />;
            case 2:
                return <Location onSubmit={handleLocationChange} />;
            case 3:
                return <DateForm onSubmit={handleSubmit} isLoading={loading} />;
            default:
                return null;
        }
    };
    return (
      <div className="max-w-screen-xl mx-auto flex flex-col items-start mt-20 mb-20 py-6 px-6 md:px-20 sm:px-6">
        <Helmet>
                <title>Reservation</title>
                <meta name="description" content="Reservation" />
            </Helmet>
                        <div  className="flex justify-between flex-col p-6 w-full   text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow">
                            <div className="flex   items-center   relative h-28 xs:h-28 md:h-28 w-full">
                                <img className=" h-full mr-10 left-0 top-0 right-0 bottom-0" src={`http://127.0.0.1:8000${service.image}`} alt="" />
                                <div className='flex flex-col items-start'>
                                    <h3 className="mb-4 text-3xl font-extrabold">{service.name}</h3>
                                    <span className="mr-2 text-xl font-semibold">{service.price}  <span className="text-gray-500 dark:text-gray-400">/Dh</span></span>

                                </div>
                            </div>


                            {/* List */}
                            <ul role="list" className="mb-8 space-y-4 text-left mt-8">
                                {service.features?.map((feature) => (
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
        <div className="flex items-center space-x-4 my-8">
          <div className={`flex items-center justify-center ${formData.activeStep >= 1 ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'} rounded-full h-10 w-10`}>
            <TruckIcon className="h-5 w-5" />

          </div>
          <div className={`h-1 w-20  ${formData.activeStep >= 1 ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'} rounded-full`}></div>
          <div className={`flex items-center justify-center ${formData.activeStep >= 2 ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'} rounded-full h-10 w-10`}>
            <MapPinIcon className="h-5 w-5" />

          </div>
          <div className={`h-1 w-20  ${formData.activeStep >= 2 ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'} rounded-full`}></div>
          <div className={`flex items-center justify-center ${formData.activeStep >= 3 ? 'bg-black text-white' : 'bg-gray-300 text-gray-400'} rounded-full h-10 w-10`}>
            <CalendarIcon className="h-5 w-5" />
          </div>
          {/* Add more icons for additional steps */}
        </div>
        {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
                        </div>)}
        {renderForm()}
        <SuccessModal message={successMessage} showModal={showModal} onClose={handleCloseModal} />
      </div>
  );
};

export default Reservation;
