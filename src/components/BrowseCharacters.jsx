import { useState } from "react";
import { string } from "prop-types";
import CharacterList from "./CharacterList";
import { useNavigate, useLocation } from "react-router-dom";

const BrowseCharacters = ({ publicKey, ts, hash }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSearch = new URLSearchParams(location.search).get("search") || "";
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    const newUrl = searchValue
      ? `/characters?search=${searchValue}`
      : "/characters";
    navigate(newUrl);
  };
  return (
    <div className="browse-container">
      <h1 className="browse-header">Browse Marvel Characters</h1>
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <CharacterList
        publicKey={publicKey}
        ts={ts}
        hash={hash}
        searchTerm={searchTerm}
      />
    </div>
  );
};

BrowseCharacters.propTypes = {
  publicKey: string,
  ts: string,
  hash: string,
};

export default BrowseCharacters;
