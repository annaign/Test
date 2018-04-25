import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function DownloadData(props) {
  const { onClick } = props;

  return (
    <React.Fragment>
      <button className="btn" onClick={() => onClick('small')}>
        Small Data
      </button>
      <button className="btn" onClick={() => onClick('big')}>
        Big Data
      </button>
    </React.Fragment>
  );
}

DownloadData.propTypes = {
  onClick: PropTypes.func.isRequired
};
