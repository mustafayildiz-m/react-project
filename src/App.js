import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Categories from './Categories';
import Search from './Search';


const MainPage = () => {
    // Ana sayfa bileşeninizin içeriği buraya gelecek
    return (
        <div>
            <h1>Ana Sayfa İçeriği</h1>
            {/* Ana sayfa içeriğini buraya ekleyin */}
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Ana Sayfa</Link>
                        </li>
                        <li>
                            <Link to="/categories">Kategoriler</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route exact path="/search" element={<Search/>} />

                </Routes>
            </div>
        </Router>
    );
};

export default App;
