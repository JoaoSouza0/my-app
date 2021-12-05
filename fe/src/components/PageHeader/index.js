import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './style';
import arrow from '../../assets/image/Icons/arrow.svg';

export function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={arrow} alt="arrow" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
