import React from 'react';
import PropTypes from 'prop-types';

import ButtonPrimary from './ButtonPrimary';
import Spinner from '../utils/Spinner';

const ButtonSearch = ({ loading, submitPage }) =>
    loading && submitPage === 1 ? (
        <Spinner />
    ) : (
        <ButtonPrimary type="submit" icon="search" text="Search" />
    );

ButtonSearch.propTypes = {
    loading: PropTypes.bool.isRequired,
    submitPage: PropTypes.number.isRequired
};

export default ButtonSearch;
