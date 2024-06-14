// src/components/Filter.js
import React from 'react';

const Filter = ({ label, options, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
