import { Container } from './styles';
import ToastMessage from '../ToastMesssager';

export default function ToastContainer() {
  return (
    <Container>
      <ToastMessage text="Default Toast" />
      <ToastMessage text="Error Toast" type="danger" />
      <ToastMessage text="Success Toast" type="success" />
    </Container>
  );
}
