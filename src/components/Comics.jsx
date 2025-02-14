import { useState, useEffect } from 'react';
import {string} from 'prop-types';

const Comics = ({ publicKey, ts, hash }) => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        const data = await response.json();
        setComics(data.data.results);
      } catch (error) {
        setError('Error fetching comics');
        console.error('Error fetching comics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComics();
  }, [publicKey, ts, hash]);

  if (loading) return <div>Loading comics...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h2>Marvel Comics</h2>
      <div className="comics-grid">
        {comics.map((comic) => (
          <div key={comic.id} className="comic-card">
            <h3>{comic.title}</h3>
            <img 
              src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="character-image"
            />
            <p>{comic.description || 'No description available.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Comics.propTypes = {
  publicKey: string,
  ts: string,
  hash: string,
};

export default Comics;