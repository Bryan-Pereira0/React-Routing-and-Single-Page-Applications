import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { string } from "prop-types";

const CharacterList = ({ publicKey, ts, hash, searchTerm }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        let url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
        if (searchTerm) {
          url += `&nameStartsWith=${searchTerm}`;
        }
        const response = await axios.get(url);
        setCharacters(response.data.data.results);
        setError(null);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Failed to load characters");
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchCharacters();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [publicKey, ts, hash, searchTerm]);

  if (loading) return <div>Loading characters...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (characters.length === 0) return <div>No characters found</div>;

  return (
    <div className="character-grid">
      {characters.map((character) => (
        <div
          key={character.id}
          onClick={() => navigate(`/characters/${character.id}`)}
          className="character-card"
        >
          <h3>{character.name}</h3>
          <img
            src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
            alt={character.name}
            className="character-image"
          />
        </div>
      ))}
    </div>
  );
};

CharacterList.propTypes = {
  publicKey: string,
  ts: string,
  hash: string,
  searchTerm: string,
};

CharacterList.defaultProps = {
  searchTerm: "",
};

export default CharacterList;