import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const GameInformation = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games/${gameId}`
        );
        setGame(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen des Spiels", error);
      }
    };

    fetchGame();
  }, [gameId]);

  return (
    <>
      {game ? (
        <div>
          <h2>{game.title}</h2>
          <p>{game.description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default GameInformation;
