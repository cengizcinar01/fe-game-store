import { useState, useEffect } from "react";
import axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games`
        );
        setGames(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Spiele", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <h1>Spiele</h1>
      {games.map((game) => (
        <div key={game.id}>{game.title}</div>
      ))}
    </>
  );
};

export default Games;
