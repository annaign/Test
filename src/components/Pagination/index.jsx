import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Pagination(props) {
  const { onClick } = props;

  return (
    <div className="pagination">
      <button className="btn" onClick={() => onClick('l')}>
        &laquo; Previous
      </button>
      <button className="btn" onClick={() => onClick('r')}>
        Next &raquo;
      </button>
    </div>
  );
}

Pagination.propTypes = {
  onClick: PropTypes.func.isRequired
};
