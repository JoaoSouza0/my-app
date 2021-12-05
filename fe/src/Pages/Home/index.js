import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  ListContainer,
  Card,
  InputSearchContainer,
} from './style';
import arrow from '../../assets/image/Icons/arrow.svg';
import finder from '../../assets/image/Icons/finder.svg';
import trash from '../../assets/image/Icons/trash.svg';

export function Home() {
  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar Contato" />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">New Contact</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button">
            <span>Name</span>
            <img src={arrow} alt="Order Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>João Victor</strong>
              <small>instragram</small>
            </div>
            <span>email@email.com.br</span>
            <span>(11) 91111-1111 </span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={finder} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
