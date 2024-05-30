import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games/${gameId}`
        );
        setGame(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>{game.title}</div>
    </>
  );
};

export default GameDetails;
