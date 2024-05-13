import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthenticatedLayout from "../../../components/Dashboard/AuthenticatedLayout"
import InputLabel from "../../../components/Dashboard/InputLabel"
import TextInput from "../../../components/Dashboard/TextInput"
import SuccessModal from "../../../components/Dashboard/DialogComponent"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import axiosClient from "../../../axios"

export default function CreateService(user) {
    const navigate = useNavigate()
    const [serviceData, setServiceData] = useState({
        name: '',
        price: '',
        features: [''],
        image: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);



    const onSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage('');

        const formData = new FormData();
        formData.append('name', serviceData.name);
        formData.append('price', serviceData.price);
        serviceData.features.forEach((feature, index) => {
            formData.append(`features[${index}]`, feature);
        });
        if (serviceData.image) {
            formData.append('image', serviceData.image);
        }

        try {

            const response = await axiosClient.post('/services', formData);
            if (response.data.success) {
                setLoading(false);
                setSuccessMessage(response.data.message);
                console.log(response.data.message);
                setShowModal(true);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error creating user:', error);
            setError(error.response.data.message);

        }
    };


    const handleImageChange = (e) => {
        setServiceData({ ...serviceData, image: e.target.files[0] });
    };

    const handleInputChange = (e) => {

        setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    };

    const handleAddFeature = () => {
        setServiceData({ ...serviceData, features: [...serviceData.features, ''] });
    };

    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...serviceData.features];
        updatedFeatures[index] = value;
        setServiceData({ ...serviceData, features: updatedFeatures });
    };

    const handleRemoveFeature = (index) => {
        const updatedFeatures = [...serviceData.features];
        updatedFeatures.splice(index, 1);
        setServiceData({ ...serviceData, features: updatedFeatures });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('');
        navigate('/services')
    };


    return (
        <AuthenticatedLayout
            user={user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Créer un nouveau service
                    </h2>
                </div>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
                        <form
                            onSubmit={onSubmit}

                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            encType="multipart/form-data"
                        >
                            <div className="mt-4">
                                <InputLabel htmlFor="service_name" value="Nom du service" />

                                <TextInput
                                    id="service_name"
                                    type="text"
                                    name="name"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    value={serviceData.name}
                                    onChange={handleInputChange}
                                />

                                { /*<InputError message={errors.name} className="mt-2" />*/}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="service_phone" value="Prix" />

                                <TextInput
                                    id="price"
                                    type="text"
                                    name="price"
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    value={serviceData.price}
                                    onChange={handleInputChange}
                                />

                                { /*<InputError message={errors.name} className="mt-2" />*/}
                            </div>


                            <div className="mt-4">
                                <InputLabel htmlFor="Image" value="Image" />
                                <TextInput
                                    id="user_email"
                                    type="file"
                                    name="image"
                                    accept="image/jpeg, image/png, image/jpg, image/gif"
                                    className="mt-1 block w-full"
                                    onChange={handleImageChange}
                                />

                                {/*<InputError message={errors.email} className="mt-2" />*/}
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center">
                                    <h3 className="mr-2">Caractéristiques:</h3>
                                    <button type="button"
                                        className=" py-2 px-4 rounded-full"
                                        onClick={handleAddFeature}
                                    >
                                        <PlusIcon className="h-5 w-5 text-green-500" />
                                    </button>
                                </div>
                                {serviceData.features.map((feature, index) => (
                                    <div key={index} className="flex space-x-4 items-center my-3">
                                        <TextInput
                                            id="user_password"
                                            type="text"
                                            name="password"
                                            value={feature}
                                            className="mt-1 block w-full"
                                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        />
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                            onClick={() => handleRemoveFeature(index)}
                                        >
                                            <TrashIcon className="h-5 w-5 text-white-500" />
                                        </button>
                                    </div>
                                ))}



                                {/*<InputError message={errors.password} className="mt-2" />*/}
                            </div>




                            <div className="mt-12 text-right">
                                <Link
                                    to='/users'
                                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                >
                                    Annuler
                                </Link>
                                <button type="submit" className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                    Créer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <SuccessModal message={successMessage} showModal={showModal} onClose={handleCloseModal} />
        </AuthenticatedLayout>
    );
}
