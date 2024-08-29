import { useState } from 'react'

export function SelectInput({setStatus, eventType, options, text}) {
    const [selectOpen, setSelectOpen] = useState(false);
    const [textToDefault, setTextToDefault] = useState('');
    const handleClick = () => {
      setSelectOpen(true);
      if (selectOpen) {
        if (text === 'Tipo de evento') {
          setTextToDefault('Todos los tipos');
        }
        if (text === 'Localidades') {
          setTextToDefault('Todas las localidades');
          }
      }
    }

function handleChange(e){
    const {name} = e.target;
    const value = e.target.value;
    switch(name){
      case 'typeEvent':
        setStatus(value);
        break;
      case 'locationEvent':
        setStatus(value);
        break;
      default: 
        break;
    }
  }

  return (
    <div className="filter filter-type">
      <label htmlFor={eventType}>{text}</label>
      <select
        className="select-input"
        defaultValue=""
        onClick={handleClick}
        onChange={handleChange}
        name={eventType}
        id={eventType}
      >
        <option value="">{textToDefault ? textToDefault : text}</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}  