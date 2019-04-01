import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title';
import Icon from '../utils/Icon';

const SavedSearches = ({ queries, submitetSearch, handleSearchSaveSubmit, handleSearchDelete }) => {
    const renderSavedSearches = () =>
        queries.map(query => (
            <li key={query}>
                <button
                    onClick={() => handleSearchSaveSubmit(query)}
                    className={query === submitetSearch ? 'queries--active' : ''}
                >
                    {query}
                    <span onClick={e => handleSearchDelete(e, query)}>
                        <Icon name="close" />
                    </span>
                </button>
            </li>
        ));

    return (
        <aside className="queries">
            <Title text="Saved searches" icon="save" />
            <ul>{renderSavedSearches()}</ul>
        </aside>
    );
};

SavedSearches.propTypes = {
    queries: PropTypes.array.isRequired,
    submitetSearch: PropTypes.string,
    handleSearchSaveSubmit: PropTypes.func.isRequired,
    handleSearchDelete: PropTypes.func.isRequired
};

export default SavedSearches;
