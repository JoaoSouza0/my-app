import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/image/Icons/x-circle-min.svg';
import checkCircleIcon from '../../../assets/image/Icons/check-circle-min.svg';

const imageEnum = {
  danger: xCircleIcon,
  success: checkCircleIcon,
};

function ToastMessage({ text, type }) {
  return (
    <Container type={type}>
      {imageEnum[type] && <img src={imageEnum[type]} alt="ICON" />}
      <strong> {text} </strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'danger', 'success']),
};

ToastMessage.defaultProps = {
  type: 'default',
};

export default ToastMessage;
