import React from 'react';

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

export default SavedSearches;
