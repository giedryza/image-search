import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../utils/Icon';

const ImageItem = ({
  image: {
    urls: { small, full },
    alt_description,
  },
}) => (
  <a href={full} target="_blank" rel="noopener noreferrer" className="images__grid-item">
    <img src={small} alt={alt_description} />
    <Icon name="zoom" />
  </a>
);

ImageItem.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
      full: PropTypes.string.isRequired,
    }),
    alt_description: PropTypes.string,
  }).isRequired,
};

export default ImageItem;
