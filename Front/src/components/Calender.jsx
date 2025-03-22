import React, { useState, useEffect } from 'react';
import './Calendar.css'; // Importez le fichier CSS

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    generateCalendarDays();
  }, [currentDate]);

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Dimanche) - 6 (Samedi)

    const daysArray = [];

    // Jours du mois précédent pour compléter la première semaine
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      daysArray.push({ day: prevMonthLastDay - startingDayOfWeek + i + 1, isCurrentMonth: false });
    }

    // Jours du mois courant
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({ day: i, isCurrentMonth: true });
    }

    // Jours du mois suivant pour compléter la dernière semaine
    const remainingDays = 42 - daysArray.length; // 42 = 6 semaines * 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({ day: i, isCurrentMonth: false });
    }

    setCalendarDays(daysArray);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToPreviousYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

   const goToNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousYear}>&lt;&lt;</button>
        <button onClick={goToPreviousMonth}>&lt;</button>
        <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={goToNextMonth}>&gt;</button>
        <button onClick={goToNextYear}>&gt;&gt;</button>
      </div>
      <div className="calendar-body">
        <div className="calendar-weekdays">
          <div>Dim</div>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mer</div>
          <div>Jeu</div>
          <div>Ven</div>
          <div>Sam</div>
        </div>
        <div className="calendar-days">
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={`calendar-day ${dayData.isCurrentMonth ? 'current-month' : 'other-month'}`}
            >
              {dayData.day}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;