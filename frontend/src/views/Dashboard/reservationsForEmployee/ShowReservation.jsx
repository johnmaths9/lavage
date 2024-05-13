import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button, Timeline } from 'flowbite-react';
import { HiUser, HiArrowNarrowRight, HiOutlineTruck, HiLocationMarker, HiCalendar } from "react-icons/hi";
import axiosClient from '../../../axios';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhbTEyIiwiYSI6ImNsdXZvNDd6bjA1OTIya2xreHpnNHdqbzQifQ.pnaF-0baGwnZBmLyjFNErA';

export default function ShowReservation({ showModal, onClose, itemId }) {
    const [reservation, setReservation] = useState({});
    const [map, setMap] = useState(null);
    const [loading, setLoading] = useState(false);
    const mapContainer = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await axiosClient.get(`/reservations/${itemId}`);
                setReservation(data);
            } catch (error) {
                console.error('Error fetching reservation data:', error);
            } finally {
                setLoading(false);
            }
        };
        if(showModal){
            fetchData();
        }


    }, [itemId]);

    useEffect(() => {
        const { latitude, longitude } = reservation || {};

        if (latitude && longitude && mapContainer.current) {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [longitude, latitude],
                zoom: 14,
            });

            // Add a marker at the specified location
            new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);

            // Clean up on unmount
            return () => map.remove();
        }
    }, [reservation.location]);


    return (
        <Modal show={showModal} size="5xl" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <Timeline>
                        <Timeline.Item>
                            <Timeline.Point icon={HiUser} />
                            <Timeline.Content>
                                <Timeline.Time>Client</Timeline.Time>
                                <Timeline.Body>
                                    <ul>
                                        <li>Nom: {reservation.user?.name}</li>
                                        <li>Email: {reservation.user?.email}</li>
                                        <li>Phone: {reservation.user?.phone}</li>
                                    </ul>
                                </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Point icon={HiOutlineTruck} />
                            <Timeline.Content>
                                <Timeline.Time>Voiture</Timeline.Time>
                                <Timeline.Body>
                                    <ul>
                                        <li>Marque: {reservation.car?.make}</li>
                                        <li>Modèle: {reservation.car?.model}</li>
                                        <li>Année: {reservation.car?.year}</li>
                                        <li>La plaque d’immatriculation: {reservation.car?.license_plate}</li>
                                    </ul>
                                </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Point icon={HiCalendar} />
                            <Timeline.Content>
                                <Timeline.Time>Date</Timeline.Time>
                                <Timeline.Body>
                                    <p>{reservation.reservation_date}</p>
                                </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
                        <Timeline.Item>
                            <Timeline.Point icon={HiLocationMarker} />
                            <Timeline.Content>
                                <Timeline.Time>Emplacement</Timeline.Time>
                                <Timeline.Body>
                                    <ul>
                                        <li>Adresse: {reservation.location}</li>
                                        <li>
                                            <div ref={mapContainer} style={{ height: "500px" }}></div>
                                        </li>
                                    </ul>
                                </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
                    </Timeline>
                )}
            </Modal.Body>
        </Modal>
    );
}
