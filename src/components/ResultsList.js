import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function ResultList(props) {
  return (
    <Container>
      <h2>{props.title}</h2>
      <div className="card-container">
        {props.results.map(result => (
          <Card key={result.place_id}>
            <Link to={`/details/${result.place_id}`} key={result.place_id}>
            <img src={result.photos && result.photos.length > 0 ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=${process.env.REACT_APP_KEY}` : null} alt={result.name} />
            <div className="card-body">
              <h3>{result.name}</h3>
              <p>{result.vicinity}</p>
            </div>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  h2 {
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: bold;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
  }
`;

const Card = styled.div`
  width: 240px;
  height: 280px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 60%;
    object-fit: cover;
  }

  .card-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 40%;

    h3 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 8px;
      text-align: center;
    }

    p {
      font-size: 16px;
      text-align: center;
    }
  }
`;

export default ResultList;