import { Container } from './styles';
import logo from '../../assets/image/logo.svg'; // Retorna o caminho da logo

export default function Headers() {
  return (
    <Container>
      <img src={logo} alt="MyContacts Logo" width="201" />
    </Container>
  );
}
