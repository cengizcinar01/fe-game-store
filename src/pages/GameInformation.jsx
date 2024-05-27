import { useParams } from "react-router-dom";

const GameInformation = () => {
  const { gameId } = useParams();
  return (
    <>
      <div>GameInformation</div>
      <p>{gameId}</p>
    </>
  );
};

export default GameInformation;
