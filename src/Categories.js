import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            })
            .catch(error => {
                console.error('Kategoriler alınırken bir hata oluştu:', error);
            });
    }, []);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const quotesInCategory = categories.filter(cat => cat === category);
        const randomIndex = Math.floor(Math.random() * quotesInCategory.length);
        setRandomQuote(quotesInCategory[randomIndex]);
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
                        {category}
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
