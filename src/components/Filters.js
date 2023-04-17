import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getAllCategories } from '../service/api';
import styled from "styled-components";

const Filters = ({ onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    getAllCategories().then((response) => {
      const newResults = response.data;
      setOptions(newResults.categories);
      console.log(newResults.categories);
    }).catch((error) => {
      console.error(error);
      alert('An error occurred. Please try again later!');
    });
  }, []);

  const handleOptionsChange = (selected) => {
    setSelectedOptions(selected);
    const values = selected.map((option) => option.value);
    onChange(values);
  };

  return (
    <Div>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleOptionsChange}
      />
    </Div>
  );
};

const Div = styled.div`
  width: 80vw; 
  max-width: 300px;
`;

export default Filters;