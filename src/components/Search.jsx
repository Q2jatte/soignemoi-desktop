import React, { useState } from 'react';
import Header from './Header';

function Search(){    

    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
        handleSearch();
        }
    };

    return (
        <div className="content">
            <Header title="Recherche d'un patient"/>
            <form>            
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
                <button className="min-button" onClick={handleSearch}>Rechercher</button>
            </form>
        </div>
    );
}

export default Search;