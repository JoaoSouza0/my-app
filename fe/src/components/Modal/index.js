import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { OverLay, Container, Footer } from './styles';
import Button from '../Button';

export function Modal({ danger }) {
  return ReactDOM.createPortal(
    <OverLay>
      <Container danger={danger}>
        <h1>Titulo do modal</h1>
        <p>corpo do modal</p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button danger={danger} type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </OverLay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
