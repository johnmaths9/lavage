import { Carousel  } from 'flowbite-react';
import { BrowserRouter , Route, RouterProvider, Routes } from 'react-router-dom';
import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import router from './routes/routes';
import { ContextProvider } from './contexts/ContextProvider';


export default function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>

    );
}
