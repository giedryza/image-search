import React from 'react';
import PropTypes from 'prop-types';

import Title from './Title';
import ButtonPrimary from './ButtonPrimary';
import ImageItem from './ImageItem';
import Spinner from '../utils/Spinner';

const ImageGrid = ({ images, loading, submitPage, totalPages, handleLoadMore }) => {
    const renderImages = () => images.map(image => <ImageItem key={image.id} image={image} />);

    const renderLoadMoreButton = () => {
        if (loading && submitPage !== 1) return <Spinner />;
        if (!(submitPage === totalPages))
            return (
                <ButtonPrimary
                    type="button"
                    icon="down"
                    text="Load more"
                    onClick={handleLoadMore}
                />
            );
    };

    return (
        <article className="images">
            <Title text="Images" icon="grid" />
            <div className="images__grid">{renderImages()}</div>
            {renderLoadMoreButton()}
        </article>
    );
};

ImageGrid.propTypes = {
    images: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    submitPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    handleLoadMore: PropTypes.func.isRequired
};

export default ImageGrid;
