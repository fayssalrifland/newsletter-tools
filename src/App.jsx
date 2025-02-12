import React, { useState } from 'react';

function App() {
  const [inputUrls, setInputUrls] = useState('');
  const [filteredUrls, setFilteredUrls] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    const urlsArray = inputUrls.split('\n').filter((url) => url.trim() !== '');

    try {
      const response = await fetch('http://localhost:3001/process-urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: urlsArray }),
      });

      const data = await response.json();
      setFilteredUrls(data.filteredUrls.join('\n'));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Newsletter URL Filter</h1>
      <textarea
        rows="10"
        cols="50"
        placeholder="Enter URLs (one per line)"
        value={inputUrls}
        onChange={(e) => setInputUrls(e.target.value)}
      />
      <br />
      <button onClick={handleSearch} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Search'}
      </button>
      <br />
      <h2>Filtered URLs:</h2>
      <textarea
        rows="10"
        cols="50"
        readOnly
        value={filteredUrls}
        placeholder="Filtered URLs will appear here"
      />
    </div>
  );
}

export default App;
