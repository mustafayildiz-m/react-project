import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';


const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [randomQuote, setRandomQuote] = useState('');

    useEffect(() => {
        axios.get('https://type.fit/api/quotes')
            .then(response => {
                const quotes = response.data;
                const uniqueCategories = Array.from(new Set(quotes.map(quote => quote.category)));
                setCategories(uniqueCategories.filter(category => category !== null));
                setQuotes(quotes);
            })
            .catch(error => {
                console.error('Kategoriler alınırken bir hata oluştu:', error);
            });
    }, []);

    const [quotes, setQuotes] = useState([]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const quotesInCategory = quotes.filter(quote => quote.category === category);
        const randomIndex = Math.floor(Math.random() * quotesInCategory.length);
        setRandomQuote(quotesInCategory[randomIndex].text);
    };

    return (
        <div className="container">
            <h1>Kategoriler</h1>
            <div className="category-list">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategoryClick(category)}
                        className={selectedCategory === category ? 'active' : ''}
                    >
                        Teklif Al
                    </button>
                ))}
            </div>
            {randomQuote && (
                <div className="quote-container">
                    <p className="quote">{randomQuote}</p>
                </div>
            )}
        </div>
    );
};

export default Categories;

