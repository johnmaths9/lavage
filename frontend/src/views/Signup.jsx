import { Button, Navbar, Carousel } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios';
import { Helmet } from 'react-helmet';


export default function Signup() {
    const [loading, setLoading] = useState(false);
    const { setCurrentUser, setUserToken } = useStateContext();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState({ __html: "" });
    const navigate = useNavigate();


    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLoading(true);
        setError({ __html: "" });

        const userData = {
            name: name,
            phone: phone,
            email: email,
            password: password,
            password_confirmation: password_confirmation
        };

        try {
            const { data } = await axiosClient.post("/signup", userData);
            console.log(data);
            setCurrentUser(data.user);
            setUserToken(data.token);
            navigate('/');
        } catch (error) {
            if (error.response) {
                const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
                console.log(finalErrors);
                setError({ __html: finalErrors.join('<br>') });
            }
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Helmet>
                <title>Créez votre compte</title>
                <meta name="description" content="Créez votre compte" />
            </Helmet>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Créez votre compte
                        </h1>
                        {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
                        </div>)}
                        <form className="space-y-4 md:space-y-6"  onSubmit={onSubmit} method="POST">
                            <div>
                                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre Nom</label>
                                <input type="text" name="nom" id="nom" value={name} onChange={event => setName(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Votre Nom" required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre téléphone</label>
                                <input type="text" name="phone" id="phone" value={phone} onChange={event => setPhone(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="060000000" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                                <input type="email" name="email" id="email" value={email} onChange={event => setEmail(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                                <input type="password" name="password" id="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmez le mot de passe</label>
                                <input type="password" name="confirm-password" id="confirm-password" value={password_confirmation} onChange={event =>setPasswordConfirmation(event.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>

                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {loading ? 'Loading...' : 'Créer un compte'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Vous avez déjà un compte? <Link to='/login'> <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Connectez-vous ici</a></Link>
                            </p>
                        </form>
                    </div>
    );
}


