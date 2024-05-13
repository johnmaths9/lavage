import { useState } from "react";

const CarForm = ({ formData, handleInputChange, setFormData }) => {
    const { car } = formData;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the formData state with the new car data
        setFormData({
            ...formData,
            car: {
                ...car,
                // Update any other car properties here
            },
            activeStep: 2, // Move to the next step
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
            <div>
                <label htmlFor="make" className="block mb-2 font-bold">
                Marque
                </label>
                <input
                    type="text"
                    name="make"
                    id="make"
                    value={car.make}
                    onChange={handleInputChange}
                    placeholder="Marque de voiture"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="model" className="block mb-2 font-bold">
                Modèle
                </label>
                <input
                    type="text"
                    name="model"
                    id="model"
                    value={car.model}
                    onChange={handleInputChange}
                    placeholder="Modèle de voiture"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="year" className="block mb-2 font-bold">
                Année
                </label>
                <input
                    type="text"
                    name="year"
                    id="year"
                    value={car.year}
                    onChange={handleInputChange}
                    placeholder="Année de la voiture"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="license_plate" className="block mb-2 font-bold">
                Plaque d'immatriculation
                </label>
                <input
                    type="text"
                    name="license_plate"
                    id="license_plate"
                    value={car.license_plate}
                    onChange={handleInputChange}
                    placeholder="Plaque d'immatriculation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div className="flex w-full mt-8 ">
                <button type="submit" className=" disabled:cursor-not-allowed font-bold flex justify-center items-center rounded-lg
                                            disabled:opacity-50 transition-all text-[#ffffff] bg-[#57942f] hover:bg-[#4e7e2f]  px-6 py-2">Continuer</button>
                </div>
        </form>
    );
};

export default CarForm;
