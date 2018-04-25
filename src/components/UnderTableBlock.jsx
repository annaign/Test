import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function UnderTableBlock(props) {
  const { fullData } = props;

  return (
    <div className="underTableBlock">
      <p>
        Выбран пользователь:
        <b>{` ${fullData.firstName} ${fullData.lastName}`}</b>
      </p>
      <p>Описание:</p>
      <textarea value={fullData.description} />
      <p>
        Адрес проживания: <b>{fullData.address.streetAddress}</b>
      </p>
      <p>
        Город: <b>{fullData.address.city}</b>
      </p>
      <p>
        Провинция/штат: <b>{fullData.address.state}</b>
      </p>
      <p>
        Индекс: <b>{fullData.address.zip}</b>
      </p>
    </div>
  );
}

UnderTableBlock.propTypes = {
  fullData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.shape({
      streetAddress: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired
    }).isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};
