import React, { useState } from 'react';
import { Datepicker } from "flowbite-react";
import moment from 'moment';

const DateForm = ({ onSubmit,isLoading  }) => {
    const [selectedHour, setSelectedHour] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const hours = Array.from({ length: 12 }, (_, index) => index + 8);

    const handleHourChange = (event) => {
        const selectedHourValue = parseInt(event.target.value, 10);
        setSelectedHour(selectedHourValue);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleFormSubmit = (e) => {
        console.log("selectedDate:", selectedDate);
        console.log("selectedHour:", selectedHour);
        if (selectedHour !== null) {
            const reservationDate = new Date(selectedDate);
            reservationDate.setUTCHours(selectedHour);
            reservationDate.setUTCDate(selectedDate.getUTCDate()+ 1);
            console.log(reservationDate +'hna');
            const formattedDate = reservationDate.toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS

            const reservationData = { reservation: { reservation_date: formattedDate } };
            onSubmit(e,reservationData);
            console.log(formattedDate);

        } else {
            console.log('The reservation.reservation_date field is required.ff');
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleFormSubmit}>
                <h2>Choisissez le jour et l'heure</h2>
                <div className="mt-3">
                    <Datepicker
                        language="FR-fr"
                        showClearButton={false}
                        labelTodayButton="Aujourd'hui"
                        onSelectedDateChanged={handleDateChange}
                        weekStart={1}
                        minDate={new Date()}
                    />
                </div>
                <div className="mt-3">
                    <select
                        id="hour"
                        value={selectedHour}
                        onChange={handleHourChange}
                        className="bg-gray-50 mt-1 block w-full border-gray-300 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        required
                    >
                        <option value="">Sélectionnez une heure...</option>
                        {hours.map((hour,key) => (
                            <option key={key} value={hour}>
                                {hour}:00
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex w-full mt-8 ">
                <button
            type="submit"
            className="disabled:cursor-not-allowed font-bold flex justify-center items-center rounded-lg disabled:opacity-50 transition-all text-[#ffffff] bg-[#57942f] hover:bg-[#4e7e2f] px-6 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Réservez"}
          </button>
                </div>
            </form>
        </div>
    );
};

export default DateForm;
