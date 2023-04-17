import React, { useState } from 'react';
import Map from '../components/Map';
import Filters from '../components/Filters';
import ResultsList from '../components/ResultsList';
import { getPlaces } from '../service/api';
import Slider from '@material-ui/core/Slider';
import styled from "styled-components";

const marks = [
  { value: 1, label: '1 km' },
  { value: 100, label: '100 km' },
];

const Search = () => {
    const [location, setLocation] = useState(null);
    const [filters, setFilters] = useState([]);
    const [results, setResults] = useState([]);
    const [distance, setDistance] = useState(5);
  
    const handleLocationChange = (newLocation) => {
      setLocation(newLocation);
    };
  
    const handleFiltersChange = (newFilters) => {
      setFilters(newFilters);
    };
    
    
    const handleDistanceChange = (event, value) => {
      setDistance(value);
    };
  
    const handleSubmit = async () => {
      if (!location) {
        alert('Please select a location!');
        return;
      }
  
      const { lat, lng } = location;
      //const radius = 2000; // 2km
      const types = filters.join('|');
  
      const body = {
        lat: lat,
        lng: lng,
        radius: distance*1000,
        types: types
      }
      
      getPlaces(body).then((response) => {
        const newResults = response.data;
        setResults(newResults);
        console.log(newResults);
      }).catch((error) => {
        console.error(error);
        alert('An error occurred. Please try again later!');
      });

    };
  
    return (
      <div>
        <SearchDiv>
          <Topo>
            <Filters onChange={handleFiltersChange} />
            <SearchButton onClick={handleSubmit}>Search</SearchButton>
          </Topo>
          <Slide>
            <Slider
              value={distance}
              onChange={handleDistanceChange}
              min={1}
              max={100}
              step={1}
              marks={marks}
              valueLabelDisplay="auto"/>
            </Slide>
        </SearchDiv>
        <Map onChange={handleLocationChange} />
        <ResultsList results={results} />
      </div>
    )
  };

  const SearchDiv = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
    left: 50%;
    transform: translateX(-50%);
    top: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    height: 100px;
    z-index: 1;
    padding-top: 20px;
`;

const Slide = styled.div`
  width: 80vw; 
  max-width: 330px;
`;

const Topo = styled.div`
  display: flex;
  flex-direction: row;
  button{
    border-radius: 10px;
  }
`;

const SearchButton = styled.button`
  padding: 10px 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0069d9;
  }
`;

export default Search;
