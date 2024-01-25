import React, { useState } from 'react';

const CustomCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrev = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, prevDate.getDate()));
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, prevDate.getDate()));
  };

  const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const day = firstDayOfMonth.getDate() + i * 7 + j;
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

        if (date >= firstDayOfMonth && date <= lastDayOfMonth) {
          row.push(
            <span key={date} className={date.getMonth() !== currentDate.getMonth() ? 'other-month' : ''}>
              {`${daysOfWeek[date.getDay()]} ${day}`}
            </span>
          );
        } else {
          row.push(<span key={date} className="other-month"></span>);
        }
      }
      days.push(<div key={i}>{row}</div>);
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="nav">
        <button onClick={handlePrev}>&lt;</button>
        <span>{currentDate.getFullYear()}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className="nav">
        <button onClick={handlePrev}>&lt;</button>
        <span>{currentDate.toLocaleString('default', { month: 'long' })}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className="days">{renderDays()}</div>
    </div>
  );
};

export default CustomCalendar;
