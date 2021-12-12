/* eslint-disable no-console */
import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import ContactsService from '../../services/ContactsService';
import { validations } from '../../utils/validate';
import { Loader } from '../../components/Loader';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
} from './style';
import arrow from '../../assets/image/Icons/arrow.svg';
import finder from '../../assets/image/Icons/finder.svg';
import trash from '../../assets/image/Icons/trash.svg';

export function Home() {
  const [constacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSeachTerm] = useState('');
  const [isLoading, setLoading] = useState(true);

  const filteredContacts = useMemo(
    () => constacts.filter((item) => item.name.toLowerCase().includes(searchTerm)),
    // eslint-disable-next-line comma-dangle
    [constacts, searchTerm]
  );

  useEffect(() => {
    /* Funções de efeito não podem ser assincronas
      precisa criar uma função assinctona dentro do useEffecy */
    async function loadContacts() {
      try {
        setLoading(true);
        const data = await ContactsService.listContacts(orderBy);
        setContacts(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((pState) => (pState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearhTerm(event) {
    setSeachTerm(event.target.value.toLowerCase());
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquisar Contato"
          onChange={handleChangeSearhTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">New Contact</Link>
      </Header>

      <ListHeader order={orderBy}>
        {filteredContacts.length > 0 && (
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Name</span>
            <img src={arrow} alt="Order Arrow" />
          </button>
        )}
      </ListHeader>

      {filteredContacts.map((item) => (
        <Card key={item.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{item.name}</strong>
              {item.category_name && <small>{item.category_name}</small>}
            </div>
            <span>{item.email}</span>
            <span>{validations.formatPhone(item.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${item.id}`}>
              <img src={finder} alt="edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="trash" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
