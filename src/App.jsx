import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/NavigationBar';
import Home from './components/Home';
import BrowseCharacters from './components/BrowseCharacters';
import CharacterDetails from './components/CharacterDetails';
import Comics from './components/Comics';
import NotFound from './components/NotFound';
import ErrorMessage from './components/ErrorMessage';
import { useState } from 'react';

const App = () => {
  const [error, setError] = useState(null);
  const publicKey = "363ca53c415d19e898d1c6ea482ae29e";
  const ts = "1";
  const hash = "9c05a32a5ca1c7fa8d234a7f6f8ebf7a";

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        {error && <ErrorMessage message={error} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/characters" 
            element={
              <BrowseCharacters
                publicKey={publicKey}
                ts={ts}
                hash={hash}
                onError={setError}
              />
            } 
          />
          <Route 
            path="/characters/:id" 
            element={
              <CharacterDetails
                publicKey={publicKey}
                ts={ts}
                hash={hash}
                onError={setError}
              />
            } 
          />
          <Route path="/comics" element={<Comics publicKey={publicKey} ts={ts} hash={hash} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;