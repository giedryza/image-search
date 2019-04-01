import React from 'react';

import ButtonPrimary from './ButtonPrimary';
import Spinner from '../utils/Spinner';

const ButtonSearch = ({ loading, submitPage }) =>
    loading && submitPage === 1 ? (
        <Spinner />
    ) : (
        <ButtonPrimary type="submit" icon="search" text="Search" />
    );

export default ButtonSearch;
