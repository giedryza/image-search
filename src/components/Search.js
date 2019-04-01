import React, { useState, useEffect, useContext } from 'react';

import SearchContext from '../context/searchContext';

import Icon from '../utils/Icon';
import Spinner from '../utils/Spinner';
import Modal from '../utils/Modal';
import ButtonPrimary from './ButtonPrimary';
import SearchInput from './SearchInput';
import ImageGrid from './ImageGrid';
import SavedSearches from './SavedSearches';

const Search = () => {
    const API = {
        rootURL: 'https://api.unsplash.com/search/photos',
        perPage: 12,
        initSearch: 'lithuania',
        fetchInitObject: {
            headers: {
                'Accept-Version': 'v1',
                Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
            }
        }
    };

    const [searchInput, setSearchInput] = useState('');
    const [searchSubmit, setSearchSubmit] = useState({ query: API.initSearch, page: 1 });
    const [images, setImages] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { queries, saveQuery, deleteQuery } = useContext(SearchContext);

    useEffect(() => {
        fetchResults(searchSubmit.query);
    }, [searchSubmit]);

    const fetchResults = async query => {
        try {
            setLoading(true);

            const res = await fetch(
                `${API.rootURL}?page=${searchSubmit.page}&per_page=${API.perPage}&query=${query}`,
                API.fetchInitObject
            );

            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Something went wrong');
            }

            const { results, total_pages } = await res.json();
            if (!results.length) {
                throw new Error('Nothing found');
            }

            if (searchSubmit.page === 1) {
                setImages(results);
            } else {
                setImages([...images, ...results]);
            }

            setTotalPages(total_pages);
            handleResetSearch({});
        } catch ({ message }) {
            handleResetSearch({
                clearResults: true,
                resetPages: true,
                error: message
            });
        }
    };

    const generateQuery = input => {
        const query = input.trim().replace(/\s{1,}/g, ',');
        return query;
    };

    const handleResetSearch = ({ clearInput, clearResults, resetPages, error }) => {
        clearInput && setSearchInput('');
        clearResults && setImages([]);
        resetPages && setTotalPages(1);

        setError(error ? error : '');
        setLoading(false);
    };

    const handleSearchInputChange = ({ target: { value } }) => {
        setSearchInput(value);
    };

    const handleSearchSubmit = e => {
        e.preventDefault();

        const query = generateQuery(searchInput);
        if (!query) {
            setError('Enter search keywords');
        } else {
            setSearchSubmit({ ...searchSubmit, page: 1, query: query });
        }
    };

    const handleLoadMore = () => {
        const nextPage = searchSubmit.page + 1;
        setSearchSubmit({ ...searchSubmit, page: nextPage });
    };

    const handleSearchSave = () => {
        const query = generateQuery(searchInput);

        try {
            if (!query) {
                throw new Error('No keywords to save');
            }
            saveQuery(query);
        } catch ({ message }) {
            setError(message);
        }
    };

    const handleSearchSaveSubmit = query => {
        setSearchInput(query);
        setSearchSubmit({ ...searchSubmit, query: query, page: 1 });
    };

    const handleSearchDelete = (e, query) => {
        e.stopPropagation();
        deleteQuery(query);
    };

    const renderSearchButton = () =>
        loading && searchSubmit.page === 1 ? (
            <Spinner />
        ) : (
            <ButtonPrimary type="submit" icon="search" text="Search" />
        );

    const renderError = () =>
        error && <Modal label="Error!" text={error} onClose={() => handleResetSearch({})} />;

    return (
        <>
            {renderError()}
            <section id="controls">
                <form onSubmit={handleSearchSubmit} className="search">
                    <SearchInput
                        id="search"
                        name="searchInput"
                        className="search__container"
                        placeholder="Start typing..."
                        ariaLabel="Search Images"
                        autoFocus={true}
                        value={searchInput}
                        onInputChange={handleSearchInputChange}
                        onResetClick={() =>
                            handleResetSearch({
                                clearInput: true,
                                clearResults: true,
                                resetPages: true
                            })
                        }
                    />

                    <div className="search__actions">
                        {renderSearchButton()}

                        <ButtonPrimary
                            type="button"
                            icon="check"
                            text="Save"
                            onClick={handleSearchSave}
                        />
                    </div>
                </form>
            </section>

            <section id="content">
                <ImageGrid
                    images={images}
                    loading={loading}
                    page={searchSubmit.page}
                    totalPages={totalPages}
                    handleLoadMore={handleLoadMore}
                />

                <SavedSearches
                    queries={queries}
                    submitetSearch={searchSubmit.query}
                    handleSearchSaveSubmit={handleSearchSaveSubmit}
                    handleSearchDelete={handleSearchDelete}
                />
            </section>
        </>
    );
};

export default Search;
