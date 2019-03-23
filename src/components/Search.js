import React, { useState, useContext } from 'react';

import SearchContext from '../context/searchContext';

import Icon from '../utils/Icon';
import Spinner from '../utils/Spinner';
import Modal from '../utils/Modal';
import ButtonPrimary from './ButtonPrimary';
import Title from './Title';
import SearchInput from './SearchInput';
import ImageItem from './ImageItem';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [images, setImages] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const context = useContext(SearchContext);

    const API = {
        rootURL: 'https://api.unsplash.com/search/photos',
        perPage: 12,
        fetchInitObject: {
            headers: {
                'Accept-Version': 'v1',
                Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
            }
        }
    };

    const generateQuery = input => {
        const query = input.trim().replace(/\s{1,}/g, ',');
        return query;
    };

    const fetchResults = async (query, page = 1) => {
        try {
            setLoading(true);

            const res = await fetch(
                `${API.rootURL}?page=${page}&per_page=${API.perPage}&query=${query}`,
                API.fetchInitObject
            );

            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Something went wrong');
            }

            const { results, total_pages } = await res.json();
            if (!results.length) {
                throw new Error('Nothing found');
            }

            if (page === 1) {
                setImages(results);
            } else {
                setImages([...images, ...results]);
            }

            setTotalPages(total_pages);
            setError('');
            setLoading(false);
        } catch ({ message }) {
            setError(message);
            setLoading(false);
        }
    };

    const handleSearchInputChange = ({ target: { value } }) => {
        setSearchInput(value);
        handleResetSearch(false);
    };

    const handleSearchSubmit = e => {
        e.preventDefault();

        setCurrentPage(1);

        const query = generateQuery(searchInput);
        if (!query) {
            setError('Enter search keywords');
        } else {
            fetchResults(query);
        }
    };

    const handleResetSearch = clearInput => {
        if (clearInput) {
            setSearchInput('');
        }

        setImages([]);
        setTotalPages(1);
        setCurrentPage(1);
        setError('');
        setLoading(false);
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const query = generateQuery(searchInput);
        setCurrentPage(currentPage + 1);
        fetchResults(query, nextPage);
    };

    const handleSearchSave = () => {
        const query = generateQuery(searchInput);

        try {
            if (!query) {
                throw new Error('No keywords to save');
            }
            context.saveQuery(query);
        } catch ({ message }) {
            setError(message);
        }
    };

    const handleSearchSaveSubmit = query => {
        setSearchInput(query);
        setCurrentPage(1);

        fetchResults(query);
    };

    const handleSearchDelete = (e, query) => {
        e.stopPropagation();
        context.deleteQuery(query);
    };

    const renderImages = () => images.map(image => <ImageItem key={image.id} image={image} />);

    const renderSearchButton = () =>
        loading && currentPage === 1 ? (
            <Spinner />
        ) : (
            <ButtonPrimary type="submit" icon="search" text="Search" />
        );

    const renderLoadMoreButton = () => {
        if (loading && currentPage !== 1) return <Spinner />;
        if (!(currentPage === totalPages))
            return (
                <ButtonPrimary
                    type="button"
                    icon="down"
                    text="Load more"
                    onClick={handleLoadMore}
                />
            );
    };

    const renderSavedSearches = () =>
        context.queries.map(query => (
            <li key={query}>
                <button
                    onClick={() => handleSearchSaveSubmit(query)}
                    className={query === searchInput ? 'queries--active' : ''}
                >
                    {query}
                    <span onClick={e => handleSearchDelete(e, query)}>
                        <Icon name="close" />
                    </span>
                </button>
            </li>
        ));

    const renderError = () =>
        error && <Modal label="Error!" text={error} onClose={() => handleResetSearch(false)} />;

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
                        autoFocus={true}
                        value={searchInput}
                        onInputChange={handleSearchInputChange}
                        onResetClick={() => handleResetSearch(true)}
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
                <article className="images">
                    <Title text="Images" icon="grid" />
                    <div className="images__grid">{renderImages()}</div>
                    {renderLoadMoreButton()}
                </article>
                <aside className="queries">
                    <Title text="Saved searches" icon="save" />
                    <ul>{renderSavedSearches()}</ul>
                </aside>
            </section>
        </>
    );
};

export default Search;
