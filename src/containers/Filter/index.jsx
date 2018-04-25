import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  onChangeHandler = event => {
    const target = event.target;
    this.setState({ search: target.value });
  };

  onClickHandler = event => {
    event.preventDefault();
    this.props.onClick(this.state.search);
  };

  render() {
    return (
      <div className="searchArea">
        <form id="js-form">
          <label htmlFor="js-dataFiltration">
            Search:
            <input
              type="search"
              id="js-dataFiltration"
              onChange={this.onChangeHandler}
            />
          </label>
          <button type="submit" onClick={this.onClickHandler}>
            Find
          </button>
        </form>
      </div>
    );
  }
}

Filter.propTypes = {
  onClick: PropTypes.func.isRequired
};
