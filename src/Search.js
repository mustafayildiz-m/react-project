import React, { useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [randomQuote, setRandomQuote] = useState(null);
    const [error, setError] = useState('');

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handleSearchClick = () => {
        axios.get('https://type.fit/api/quotes')
            .then(response => {
                const quotes = response.data;
                const matchingQuotes = quotes.filter(quote => quote.text.toLowerCase().includes(keyword.toLowerCase()));
                if (matchingQuotes.length > 0) {
                    const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
                    const randomQuote = matchingQuotes[randomIndex].text;
                    setRandomQuote(randomQuote);
                    setError('');
                } else {
                    setError('Aranan kelimeye uygun alıntı bulunamadı.');
                    setRandomQuote(null); // Alıntı bulunamazsa null olarak ayarlayalım
                }
            })
            .catch(error => {
                setError('Alıntılar alınırken bir hata oluştu. Lütfen tekrar deneyin.');
                setRandomQuote(null); // Hata durumunda da null olarak ayarlayalım
                console.error('API isteği başarısız oldu:', error);
            });
    };

    return (
        <div className="container">
            <h1>Search</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Aranacak kelimeyi girin"
                    value={keyword}
                    onChange={handleKeywordChange}
                />
                <button onClick={handleSearchClick}>Search</button>
            </div>
            {randomQuote !== null && ( // null kontrolü ekleyelim
                <div className="quote-container">
                    <p className="quote">{randomQuote}</p>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
    );
};
//test
export default Search;
