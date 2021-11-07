import React from "react";
import FormDataStyles from './FormData.module.css';

function FormData(props) {
  const { labelName, name, type, placeholder, value, onChange } = props;
  return (
    <div className={FormDataStyles.formcontrol}>
      <label htmlFor={name}>{labelName}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormData;
