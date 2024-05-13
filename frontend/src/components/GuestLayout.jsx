import { Button, Navbar, Carousel } from 'flowbite-react';
import { Outlet } from "react-router-dom";
import Logo from './Logo/Logo';

export default function GuestLayout(){
    return (
        <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            <Logo className="h-10 mr-2"/>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <Outlet />
          </div>
        </div>
      </section>
    );
}
