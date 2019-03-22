import React from 'react';

export default React.createContext({
    queries: [],
    saveQuery: queryToSave => {},
    deleteQuery: queryToDelete => {}
});
