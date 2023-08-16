import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';
import xCircleIcon from '../../../assets/image/Icons/x-circle-min.svg';
import checkCircleIcon from '../../../assets/image/Icons/check-circle-min.svg';

const imageEnum = {
  danger: xCircleIcon,
  success: checkCircleIcon,
};

function ToastMessage({ text, type, onRemove }) {
  useEffect(() => {
    setTimeout(onRemove, 2000);
  }, [onRemove]);

  return (
    <Container type={type} onClick={onRemove} role="button">
      {imageEnum[type] && <img src={imageEnum[type]} alt="ICON" />}
      <strong> {text} </strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'danger', 'success']),
  onRemove: PropTypes.func.isRequired,
};

ToastMessage.defaultProps = {
  type: 'default',
};

export default ToastMessage;
