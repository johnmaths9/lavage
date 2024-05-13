import { useState, useEffect } from "react";
import axiosClient from "../../../axios";
import { Link } from "react-router-dom";

export default function Services() {
    const [services, SetServices] = useState([])

    useEffect(() => {
        axiosClient.get('/getservices').then(({ data }) => {
            SetServices(data)
        });

    }, []);
    return (
        <section className=" bg-whit pt-8" id="services">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Nos services</h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Chez Lavage, nous nous concentrons sur la satisfaction de nos clients qui recherchent un service de lavage automobile de qualité.</p>
                </div>
                <div className="space-y-8 lg:grid lg:grid-cols-4 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {services.map((service, key) => (
                        <div key={key} className="flex justify-between flex-col p-6 mx-auto max-w-md text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <h3 className="mb-4 text-2xl font-semibold">{service.name}</h3>
                            <div className="block relative h-40 xs:h-48 md:h-40 w-full">
                                <img className="absolute h-full w-full left-0 top-0 right-0 bottom-0" src={`http://127.0.0.1:8000${service.image}`} alt="" />
                            </div>

                            <div className="flex justify-center items-baseline my-8">
                                <span className="mr-2 text-2xl font-extrabold">{service.price}</span>
                                <span className="text-gray-500 dark:text-gray-400">/Dh</span>
                            </div>
                            {/* List */}
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                {service.features?.map((feature) => (
                                    <li className="flex items-center space-x-3">
                                        {/* Icon */}
                                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link to={`/reservation/${service.token}`} className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900">Réservez </Link>
                        </div>
                    ))}

                </div>
            </div>
        </section>

    );
}
