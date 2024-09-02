import React from 'react';

function DateFilter({ label, date, setDate }) {
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="filter date-picker">
      <label>{label}</label>
      <input 
        className='select-input'
        type="date" 
        value={date} 
        onChange={handleDateChange} 
      />
    </div>
  );
};

export default DateFilter;