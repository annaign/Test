import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Table(props) {
  const {
    tableData,
    onClickData,
    onClickSort,
    sortedColumn,
    sortDirection
  } = props;
  const theadData = ['id', 'firstName', 'lastName', 'email', 'phone'];

  const onClickHandlerTD = event => {
    const index = Number(event.target.parentElement.id);
    onClickData(tableData[index]);
  };

  const onClickHandlerTH = event => {
    const index = event.target.id;
    onClickSort(index);
  };

  return (
    <table className="table">
      <thead id="js-head">
        <tr>
          {theadData.map((element, index) => {
            return (
              <th key={index} id={theadData[index]} onClick={onClickHandlerTH}>
                {element}
                <div className="btnSort">
                  <div
                    className={
                      theadData[index] === sortedColumn
                        ? sortDirection === 'down' ? 'up upAcive' : 'up upOff'
                        : 'up'
                    }
                  />
                  <div
                    className={
                      theadData[index] === sortedColumn
                        ? sortDirection === 'down'
                          ? 'down downOff'
                          : 'down downAcive'
                        : 'down'
                    }
                  />
                </div>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody id="js-tbody">
        {tableData.length > 0
          ? tableData.map((element, index) => {
              return (
                <tr
                  id={index}
                  key={`${index}${element.id}`}
                  onClick={onClickHandlerTD}
                >
                  <td>{element.id}</td>
                  <td>{element.firstName}</td>
                  <td>{element.lastName}</td>
                  <td>{element.email}</td>
                  <td>{element.phone}</td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired
    })
  ).isRequired,
  onClickData: PropTypes.func.isRequired,
  onClickSort: PropTypes.func.isRequired,
  sortedColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf(['up', 'down']).isRequired
};
