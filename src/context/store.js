import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchContext from './searchContext';

const Store = ({ children }) => {
    const [queries, setQueries] = useState([]);

    const saveQuery = queryToSave => {
        const alreadySaved = queries.includes(queryToSave);
        if (alreadySaved) {
            throw new Error('You have already saved this search');
        }

        const updatedQueries = [...queries];
        updatedQueries.push(queryToSave);
        setQueries(updatedQueries);
    };

    const deleteQuery = queryToDelete => {
        const updatedQueries = queries.filter(query => query !== queryToDelete);
        setQueries(updatedQueries);
    };

    return (
        <SearchContext.Provider
            value={{
                queries,
                saveQuery,
                deleteQuery
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

Store.propTypes = {
    children: PropTypes.node.isRequired
};

export default Store;
