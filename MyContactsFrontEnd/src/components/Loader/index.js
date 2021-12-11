import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { OverLay } from './styles';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDom.createPortal(
    <OverLay>
      <div className="loader" />
    </OverLay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
