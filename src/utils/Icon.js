import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Check } from '../assets/svg/check.svg';
import { ReactComponent as Close } from '../assets/svg/close.svg';
import { ReactComponent as Default } from '../assets/svg/default.svg';
import { ReactComponent as Down } from '../assets/svg/down.svg';
import { ReactComponent as Grid } from '../assets/svg/grid.svg';
import { ReactComponent as Save } from '../assets/svg/save.svg';
import { ReactComponent as Search } from '../assets/svg/search.svg';
import { ReactComponent as Zoom } from '../assets/svg/zoom.svg';

const Icon = ({ name }) => {
  switch (name) {
    case 'check':
      return <Check />;
    case 'close':
      return <Close />;
    case 'down':
      return <Down />;
    case 'grid':
      return <Grid />;
    case 'save':
      return <Save />;
    case 'search':
      return <Search />;
    case 'zoom':
      return <Zoom />;
    default:
      return <Default />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
