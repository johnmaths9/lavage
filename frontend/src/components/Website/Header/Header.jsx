import { Avatar, Dropdown, Navbar,Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../../contexts/ContextProvider';
import axiosClient from '../../../axios';
import Logo from '../../Logo/Logo';
import { useEffect,useState } from 'react';
import LogoutConfirmation from '../../LogoutConfirm';

export default function Header() {
    const { userToken,currentUser,setCurrentUser } = useStateContext();
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);


    useEffect(() => {
        axiosClient.get('/me').then(({ data }) => {
            setCurrentUser(data);
        })

    }, [currentUser]);

    const logout = () => {
        setShowLogoutConfirmation(true);
      };

    const handleLogoutConfirmed  = () => {
        axiosClient.post('/logout')
          .then(response => {
            if (response.data.success) {
              localStorage.removeItem('TOKEN');
              localStorage.removeItem('status');
              window.location.reload();
            }
          })
          .catch(error => {
            console.error('Logout failed:', error.response.data);
          })
          .finally(() => {
            setShowLogoutConfirmation(false);
          });
      };

    return (
        <Navbar fluid rounded className='bg-gray-50 max-w-screen-xl mx-auto'>
            <Navbar.Brand href="/">
                <Logo className='h-10' />
            </Navbar.Brand>
            <div className="flex md:order-2">
            {userToken && userToken !== ''? <Dropdown
                    arrowIcon={true}
                    inline
                    label={
                        <Avatar alt="User settings" img="https://cdn-icons-png.freepik.com/512/1177/1177568.png?uid=R23669323&ga=GA1.1.1051195066.1713962026" rounded />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">{currentUser.name}</span>
                        <span className="block truncate text-sm font-medium">{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to='/profile'> <Dropdown.Item >Profile</Dropdown.Item></Link>
                    <Link to='/mescommandes'> <Dropdown.Item >Mes Commandes</Dropdown.Item></Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>se déconnecter</Dropdown.Item>
                </Dropdown>:<Link to='/login'><Button>Se connecter</Button></Link>}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse className="text-2xl font-bold">
                <Link to='/' className="text-xl font-bold">
                    <Navbar.Link href="#" active>
                        Accueil
                    </Navbar.Link>
                </Link>
                <Navbar.Link className="text-xl font-bold" href="/" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>Services</Navbar.Link>
                <Navbar.Link className="text-xl font-bold" href="/" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Contact</Navbar.Link>
            </Navbar.Collapse>
            <LogoutConfirmation
                showModal={showLogoutConfirmation}
                onClose={() => setShowLogoutConfirmation(false)}
                onLogout={handleLogoutConfirmed}
            />
        </Navbar>
    );
}
