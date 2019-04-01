import React from 'react';

import Title from './Title';
import ButtonPrimary from './ButtonPrimary';
import ImageItem from './ImageItem';
import Spinner from '../utils/Spinner';

const ImageGrid = ({ images, loading, page, totalPages, handleLoadMore }) => {
    const renderImages = () => images.map(image => <ImageItem key={image.id} image={image} />);

    const renderLoadMoreButton = () => {
        if (loading && page !== 1) return <Spinner />;
        if (!(page === totalPages))
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

export default ImageGrid;
