import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
`;

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  margin-right: 16px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardSubtitle = styled.p`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Card = ({ name, vicinity, photoUrl }) => {
  return (
    <CardContainer>
      <CardImage src={photoUrl} />
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>{vicinity}</CardSubtitle>
      </CardContent>
    </CardContainer>
  );
};

export default Card;