import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { string } from "prop-types";

const CharacterDetails = ({ publicKey, ts, hash }) => {
  const [characterDetail, setCharacterDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        if (response.data.data.results?.length > 0) {
          setCharacterDetail(response.data.data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching character details:", error);
      }
    };

    if (id) {
      fetchCharacterDetail();
    }
  }, [id, publicKey, ts, hash]);

  if (!characterDetail) {
    return <div>Loading character details...</div>;
  }

  return (
    <div className="character-details-container">
      <h2>{characterDetail.name}</h2>
      <p>{characterDetail.description || "No description available."}</p>
      <h3>Comics:</h3>
      <ul>
        {characterDetail.comics?.items?.map((comic, index) => (
          <li key={index}>{comic.name}</li>
        )) || "No comics available."}
      </ul>
    </div>
  );
};

CharacterDetails.propTypes = {
  publicKey: string,
  ts: string,
  hash: string,
};

export default CharacterDetails;