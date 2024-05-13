import { useState } from "react"
import TextInput from "../../../components/Dashboard/TextInput"
import InputLabel from "../../../components/Dashboard/InputLabel"
import AuthenticatedLayout from "../../../components/Dashboard/AuthenticatedLayout"
import { Link, useNavigate } from "react-router-dom"
import axiosClient from "../../../axios"
import DialogComponent from "../../../components/Dashboard/DialogComponent"
import SuccessModal from "../../../components/Dashboard/DialogComponent"

export default function Create(user) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('client')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const onSubmit = async (e) => {

      e.preventDefault();
      setLoading(true);
    setError(null);
    setSuccessMessage('');

      try {
        const userData = {
            name: name,
            phone: phone,
            email: email,
            status: status,
            password: password,
            password_confirmation: password_confirmation
        };
        console.log(userData);
        const response = await axiosClient.post('/users/create', userData);
        if (response.data.success) {
            setLoading(false);
          setSuccessMessage(response.data.message || 'User created successfully!');
          setShowModal(true);
        }
        } catch (error) {
            setLoading(false);
            console.error('Error creating user:', error);
            setError(error.response.data.message || 'An error occurred while creating the user.');

        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('');
        navigate('/users')
      };


    return (
      <AuthenticatedLayout
        user={user}
        header={
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Create new User
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
              >
                <div className="mt-4">
                  <InputLabel htmlFor="user_name" value="Nom d'utilisateur" />

                  <TextInput
                    id="user_name"
                    type="text"
                    name="name"
                    value={name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setName(e.target.value)}
                  />

                 { /*<InputError message={errors.name} className="mt-2" />*/}
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="user_phone" value="Téléphone utilisateur" />

                  <TextInput
                    id="user_phone"
                    type="text"
                    name="name"
                    value={phone}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                 { /*<InputError message={errors.name} className="mt-2" />*/}
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="user_status" value="User Status" />
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className='mt-1 block w-full border-gray-300 text-gray-700   focus:border-indigo-500 focus:ring-indigo-500  rounded-md shadow-sm'>
                            <option value="client">Client</option>
                            <option value="employe">Employe</option>
                            <option value="admin">Admin</option>
                        </select>


                 { /*<InputError message={errors.name} className="mt-2" />*/}
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="user_email" value="E-mail de l'utilisateur" />
                  <TextInput
                    id="user_email"
                    type="text"
                    name="email"
                    value={email}
                    className="mt-1 block w-full"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {/*<InputError message={errors.email} className="mt-2" />*/}
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="user_password" value="Mot de passe" />

                  <TextInput
                    id="user_password"
                    type="password"
                    name="password"
                    value={password}
                    className="mt-1 block w-full"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {/*<InputError message={errors.password} className="mt-2" />*/}
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="user_password_confirmation"
                    value="Confirmez le mot de passe"
                  />

                  <TextInput
                    id="user_password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={password_confirmation}
                    className="mt-1 block w-full"
                    onChange={(e) =>
                      setPasswordConfirmation(e.target.value)
                    }
                  />

                  {/*<InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                />*/}
                </div>

                <div className="mt-4 text-right">
                  <Link
                    to='/users'
                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                    Annuler
                  </Link>
                  <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
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
