import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getPlaceById } from "../service/api";
import { BsPlusCircleFill } from "react-icons/bs";
import InputWithButton from "../components/InputWithButton.js";
import { putCategories } from '../service/api';

const Details = () => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [addCategorie, setAddCategorie] = useState(false);
  const [att, setAtt] = useState(0);
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    getPlaceById(placeId)
      .then((response) => {
        const newResults = response.data;
        setPlace(newResults);
        console.log(newResults);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred. Please try again later!");
      });
  }, [att]);

  const handleInputCategorie = (value) => {
    if(!value)
    {
        alert("tem nada");
        return;
    }
    const body = {
        value: value,
        label: value,
        placeId: place.place_id
    }
    putCategories(token, body)
    .then((response) => {
      const newResults = response.data;
      setAtt(att + 1);
      console.log(newResults);
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred. Please try again later!");
    });
  }

  const canSetAddCategorie = async () => {
    console.log(token);
    if(!token)
    {
        alert("Voce não esta logado!");
        navigate('/sign-in');
    }
    else
    {
        setAddCategorie(true);
    }

  }

  if (!place) {
    return <div>Loading...</div>;
  }

  const photoUrl =
    place.photos && place.photos.length > 0
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_KEY}`
      : null;

  return (
    <Container>
      <Title>{place.name}</Title>
      <Image src={photoUrl} alt={place.name} />
      <Center>
        <Address>
            <strong>Address:</strong> {place.formatted_address}
        </Address>
        {place.formatted_phone_number && (
            <PhoneNumber>
            <strong>Phone:</strong> {place.formatted_phone_number}
            </PhoneNumber>
        )}
        {place.website && (
            <Website>
            <strong>Website:</strong>{" "}
            <a href={place.website} target="_blank" rel="noreferrer">
                {place.website}
            </a>
            </Website>
        )}
        {place.rating && (
            <Rating>
            <strong>Rating:</strong> {place.rating}
            </Rating>
        )}
        {place.opening_hours && (
            <OpeningHours>
            <strong>Opening hours:</strong>{" "}
            {place.opening_hours.open_now ? "Open now" : "Closed now"}
            </OpeningHours>
        )}
        {place.types && (
            <OpeningHours>
                <strong>types:</strong>{" "}
                {place.types.join(', ')}
                <Icon><BsPlusCircleFill onClick={() => canSetAddCategorie()}/></Icon> 
            </OpeningHours>
        )}
        {addCategorie && (
            <InputWithButton
              placeholder="Value..."
              buttonText="Go"
              onButtonClick={handleInputCategorie}
            />
        )}
    </Center>
    </Container>
  );
};
const Icon = styled.div`
    margin-left: 7px;
    font-size: 22px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin: 1rem 0;
`;

const Image = styled.img`
  width: auto;
  margin-bottom: 1rem;
  object-fit: cover;

`;

const Address = styled.p`
  margin: 0.5rem 0;
`;

const PhoneNumber = styled.p`
  margin: 0.5rem 0;
`;

const Website = styled.p`
  margin: 0.5rem 0;
`;

const Rating = styled.p`
  margin: 0.5rem 0;
`;

const OpeningHours = styled.p`
    display: flex;
    flex-direction: row;
  margin: 0.5rem 0;
`;

export default Details;