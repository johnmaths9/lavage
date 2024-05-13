import { useEffect, useState } from "react";
import axiosClient from "../../../axios";
import SuccessModal from "../../Dashboard/DialogComponent";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function Contact(){
    const {userToken  } = useStateContext();
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        message: '',
      });
      const [error, setError] = useState(null);
      const [successMessage, setSuccessMessage] = useState('');
      const [showModal, setShowModal] = useState(false);


      useEffect(() => {
        if (userToken) {
            axiosClient
              .get('/me')
              .then(({ data }) => {
                setFormData({ ...formData, email: data.email });
              })
              .catch((error) => {
                console.error(error);
                setIsLoading(false);
              });
        }
      }, []);


      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(formData);
          const response = await axiosClient.post('/contacts', formData);
          setSuccessMessage(response.data.message);
          setShowModal(true);
          setFormData({ email: '', subject: '', message: '' });
        } catch (err) {
          setError(err.response.data.message || 'Une erreur est survenue lors de l\'envoi du formulaire.');
        }
      };

      const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('');
    };


      return (
        <section className="bg-gray-50" id="contact">
             <div className="py-8 px-8 mx-auto max-w-screen-xl lg:py-16 lg:px-12">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contactez-nous</h2>
         <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Vous avez un problème technique ? Vous souhaitez envoyer des commentaires sur une fonctionnalité bêta ? Faites le nous savoir.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Votre email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={userToken?true:false}
              value={formData.email}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
              placeholder="ex@mple.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">
            sujet
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Dites-nous comment nous pouvons vous aider"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
            Votre message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Laissez un commentaire..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            Envoyer le message
          </button>
          <SuccessModal message={successMessage} showModal={showModal} onClose={handleCloseModal} />
          {error && <p>{error}</p>}
        </form>
        </div> </section>
      );
    };


