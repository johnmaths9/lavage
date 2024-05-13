import { Button, Navbar, Carousel } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import { useState } from 'react';
import axiosClient from '../axios';
import { Helmet } from 'react-helmet';


const Login = () => {
    const { setCurrentUser, setUserToken, setUserStatus } = useStateContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ __html: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: '' });
        setLoading(true);

        axiosClient
            .post('/login', {
                email,
                password,
            })
            .then(({ data }) => {
                setCurrentUser(data.user);
                setUserToken(data.token);
                localStorage.setItem('status', data.user.status)
                console.log(data.user.status);
                const {status} = data.user
                switch (status) {
                    case 'client':
                    navigate('/');
                    break;
                    case 'admin':
                    navigate('/dashboard')
                    break;
                    case 'employe':
                    navigate('/dashboard')
                    break;
                }
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce(
                        (accum, next) => [...accum, ...next],
                        []
                    );
                    setError({ __html: finalErrors.join('<br>') });
                }
                console.error(error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after request completes
            });
    };
    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Helmet>
                <title>Connectez-vous à votre compte</title>
                <meta name="description" content="Connectez-vous à votre compte" />
            </Helmet>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Connectez-vous à votre compte
            </h1>
            {error.__html && (
                <div
                className="bg-red-500 rounded py-2 px-3 text-white"
                dangerouslySetInnerHTML={error}
                ></div>
            )}

            <form onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#" method="POST">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="exampl@e.com" required />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                    <input type="password" name="password" id="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="flex items-center justify-between">
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Mot de passe oublié?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                     {loading ? 'Loading...' : 'Se connecter'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous n'avez pas encore de compte? <Link to='/signup'> <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">S'inscrire</a></Link>
                </p>
            </form>
        </div>

    );
};

export default Login;

