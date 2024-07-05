import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss';
import { getAnimations } from '@/api/AnimationAPI';
import { useNavigate } from 'react-router-dom';
import { getHotSearch } from '@/api/SearchAPI';

const Search = () => {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [currentSuggestion, setCurrentSuggestion] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const searchRef = useRef(null);

    const loadHotSearch = async () => {
        try {
            const data = await getHotSearch();
            setSuggestions(data.filter((s) => s.word != '').map((suggestion) => suggestion.word));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        loadHotSearch();
    }, []);
    const handleOnBlur = () => {
        setTimeout(() => {
            setIsSearching(false);
            setQuery('');
        }, 300);
    };
    useEffect(() => {
        if (!isSearching && suggestions && suggestions.length > 0) {
            setCurrentSuggestion((prev) => {
                const currentIndex = suggestions.indexOf(prev);
                return suggestions[(currentIndex + 1) % suggestions.length];
            });
            const interval = setInterval(() => {
                setCurrentSuggestion((prev) => {
                    const currentIndex = suggestions.indexOf(prev);
                    return suggestions[(currentIndex + 1) % suggestions.length];
                });
            }, 2000);
            return () => clearInterval(interval);
        }
        if (isSearching && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isSearching, suggestions]);

    const handleSearchClick = () => {
        setIsSearching(true);
    };

    const handleInputChange = async (e) => {
        setQuery(e.target.value);
        try {
            const data = await getAnimations({ search: e.target.value });
            setFilteredSuggestions(data);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                {isSearching ? (
                    <div className={styles.inputContainer}>
                        <input
                            ref={searchRef}
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            onBlur={handleOnBlur}
                            placeholder="검색어를 입력하세요."
                        />
                    </div>
                ) : (
                    <div className={styles.suggestion} onClick={handleSearchClick}>
                        <div className={styles.cube}>
                            {suggestions &&
                                suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.face} ${
                                            currentSuggestion == suggestion && styles.current
                                        }`}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
                <button onClick={handleSearchClick}>
                    <FaSearch />
                </button>
            </div>
            {isSearching && filteredSuggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => navigate(`/animations/${suggestion.id}`)}>
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
