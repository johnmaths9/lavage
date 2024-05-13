import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2xhbTEyIiwiYSI6ImNsdXZvNDd6bjA1OTIya2xreHpnNHdqbzQifQ.pnaF-0baGwnZBmLyjFNErA';

const Location = ({ onSubmit }) => {
    const [location, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [map, setMap] = useState(null);
    const markerRef = useRef(null)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [-7.6114, 33.5731], // Default center (Casablanca)
            zoom: 12,
        });

        setMap(map);

        // Add a click event listener to the map
        map.on("click", (event) => {
            const coordinates = event.lngLat;
            setCoordinates(coordinates);

            // Reverse geocode the coordinates to get the address
            fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${mapboxgl.accessToken}`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.features.length > 0) {
                        setAddress(data.features[0].place_name);
                    } else {
                        setAddress("");
                    }

                    // Remove the existing marker if there is one
                    if (markerRef.current) {
                        markerRef.current.remove();
                      }

                      // Add a new marker for the chosen location
                      const newMarker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
                      markerRef.current = newMarker;

                });
        });

        return () => {
            if (markerRef.current) {
              markerRef.current.remove();
            }
          };
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ location: {location:location, latitude:coordinates.lat, longitude:coordinates.lng} });
    };

    return (

        <div className='w-full'>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input placeholder="Address" type="text" className=" w-full h-10 rounded-[0.375rem]" value={location} readOnly />
                </div>
                <div id="map" style={{ height: "500px" }}></div>
                <div className="flex w-full mt-8 ">
                    <button type="submit" className=" disabled:cursor-not-allowed font-bold flex justify-center items-center rounded-lg
                                            disabled:opacity-50 transition-all text-[#ffffff] bg-[#57942f] hover:bg-[#4e7e2f]  px-6 py-2">Continuer</button>
                </div>
            </form>
        </div>

    );
};

export default Location;
