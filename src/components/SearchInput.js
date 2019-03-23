import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

const SearchInput = ({
    id,
    autoFocus,
    name,
    className,
    placeholder,
    value,
    onInputChange,
    onResetClick
}) => {
    const renderResetButton = () =>
        value && (
            <button type="button" onClick={onResetClick}>
                <Icon name="close" />
            </button>
        );

    return (
        <div className={className}>
            <input
                type="text"
                id={id}
                name={name}
                placeholder={placeholder}
                autoFocus={autoFocus}
                value={value}
                onChange={onInputChange}
            />
            {renderResetButton()}
        </div>
    );
};

SearchInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoFocus: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onResetClick: PropTypes.func.isRequired
};

export default SearchInput;
