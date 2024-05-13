import { Avatar } from "flowbite-react";
import React, { useState, useEffect } from 'react';
import axiosClient from "../../../axios";
import { Link, Navigate } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Helmet } from "react-helmet";

export default function Profile() {

    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [isDirty, setIsDirty] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {  userToken } =
    useStateContext();

    if (!userToken) {
        return <Navigate to="/" />;
      }


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosClient.get('/me');
                setUserData(response.data);

                setFormData({
                    name: response.data.name,
                    phone: response.data.phone,
                    email: response.data.email,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setIsDirty(true); // Set isDirty to true on field change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axiosClient.post('/update-profile', formData);
            if(response.data.success){
                setSuccessMessage(response.data.message);
            setFormData({
                name: response.data.user.name,
                phone: response.data.user.phone,
                email: response.data.user.email,
            });
            setErrorMessage('');
            setIsDirty(false);
            }
        } catch (error) {

            setErrorMessage(error.response.data.message);
            setSuccessMessage('');
        }
    };



    return (
        <div className="mt-16 mx-auto max-w-screen-xl">
            <Helmet>
                <title>Profile</title>
                <meta name="description" content="Profile" />
            </Helmet>
            <div className="mb-12 p-8">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-2xl shadow-lg">
                        <div className="flex h-full flex-col items-start justify-center p-6">

                            <div className="flex w-full flex-col items-center justify-center">
                                <div className="flex w-full justify-center">
                                    <span className="chakra-avatar">
                                        <Avatar size="xl" alt="User settings" img="https://cdn-icons-png.freepik.com/512/1177/1177568.png?uid=R23669323&ga=GA1.1.1051195066.1713962026" rounded />
                                    </span>
                                </div>
                                <p className="mt-2 text-xl font-semibold capitalize"> {formData.name}</p>
                            </div>
                            <div className="mt-6 w-full border-t border-gray-200 pt-4">
                                <ul>

                                    <li className="flex w-full items-center rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100">
                                        <Link to='/mescommandes'>
                                        <a className="group relative flex w-full font-medium no-underline transition-colors">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-2xl text-primary " height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="none" d="M0 0h24v24H0z"></path>
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                            </svg>
                                            <span className="ms-2">Mes Commandes</span>
                                        </a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 rounded-2xl shadow-lg">
                        <div className="p-8">
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col items-start gap-4">
                                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="chakra-form-control css-1kxonj9" role="group">
                                            <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                                            <input
                                                name="name"
                                                placeholder="Name"
                                                type="text"
                                                className="chakra-input css-1gk5bu6 w-full h-10 rounded-[0.375rem]"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div role="group" className="chakra-form-control css-1kxonj9">
                                            <label htmlFor="phone" className="block mb-2 font-semibold">Phone Number</label>
                                            <input
                                                name="phone"
                                                placeholder="Phone Number"
                                                type="text"
                                                className="chakra-input css-1gk5bu6 w-full h-10 rounded-[0.375rem]"
                                                id="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-1">
                                        <div role="group" className="chakra-form-control css-1kxonj9">
                                            <label htmlFor="email" className="block mb-2 font-semibold">Email Address</label>
                                            <input
                                                name="email"
                                                placeholder="Email Address"
                                                type="email"
                                                className="chakra-input css-1gk5bu6 w-full h-10 rounded-[0.375rem]"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex w-full mt-8">
                                        <button
                                            type="submit"
                                            className={`disabled:cursor-not-allowed font-bold flex justify-center items-center rounded-lg disabled:opacity-50 transition-all text-[#ffffff] bg-[#69b935] hover:bg-[#4e7e2f] px-6 py-2`}
                                            disabled={!isDirty}
                                        >
                                            SAVE
                                        </button>
                                    </div>
                                    <div className="success"> {successMessage}</div>
                                </div>
                            </form>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
