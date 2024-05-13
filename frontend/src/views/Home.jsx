import { Carousel } from 'flowbite-react';
import Contact from '../components/Website/Contact/Contact';
import Services from '../components/Website/Services/Services';
import { Helmet } from 'react-helmet';


export default function Home() {

    return (

        <div>
            <Helmet>
                <title>Accueil</title>
                <meta name="description" content="Accueil" />
            </Helmet>
            <section id='accueil' className="bg-gray-50">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mx-auto place-self-center text-center lg:col-span-7 pt-12">
                        <h1 className="max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">Lavage automobile de qualité professionnelle</h1>
                        <p className="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">Découvrez un service de lavage automobile exceptionnel qui prend soin de votre véhicule de manière efficace et respectueuse de l'environnement.</p>
                    </div>
                    <div className=" lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="https://jam-ar.com/_next/static/media/about-img.725b4958.png" alt="mockup" />
                    </div>
                </div>
            </section>
            <Services />
            <Contact />

        </div>
    );
}
