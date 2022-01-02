/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable-next-line comma-dangle */

import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import ContactsService from '../../services/ContactsService';
import { validations } from '../../utils/validate';
import { Loader } from '../../components/Loader';
import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContianer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './style';
import arrow from '../../assets/image/Icons/arrow.svg';
import finder from '../../assets/image/Icons/finder.svg';
import loop from '../../assets/image/loop.svg';
import emptyBox from '../../assets/image/empty-box.svg';
import trash from '../../assets/image/Icons/trash.svg';
import sad from '../../assets/image/sad.svg';
import Button from '../../components/Button';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSeachTerm] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(
    () => contacts.filter((item) => item.name.toLowerCase().includes(searchTerm)),
    [contacts, searchTerm],
  );
  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ContactsService.listContacts(orderBy);
      setContacts(data);
      setHasError(false);
    } catch (e) {
      console.log(e);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    /* Funções de efeito não podem ser assincronas
      precisa criar uma função assinctona dentro do useEffecy */
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((pState) => (pState === 'asc' ? 'desc' : 'asc'));
  }

  function handleChangeSearhTerm(event) {
    setSeachTerm(event.target.value.toLowerCase());
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {(!hasError && contacts.length > 0) && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar Contato"
            onChange={handleChangeSearhTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (contacts.length > 0
              ? 'space-between'
              : 'center'
            )
        }
      >
        {!hasError && contacts.length > 0 && (
          <>
            <strong>
              {filteredContacts.length}
              {filteredContacts.length === 1 ? ' contato' : ' contatos'}
            </strong>
            <Link to="/new">New Contact</Link>
          </>
        )}
      </Header>

      {hasError && (
        <ErrorContianer>
          <img src={sad} alt="sad-face" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button onClick={handleTryAgain} type="button">
              Tente novamente
            </Button>
          </div>
        </ErrorContianer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>”Novo contato”</strong> à
                cima para cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
            <SearchNotFoundContainer>
              <img src={loop} alt="Not found o" />
              <span>
                nenhum contato foi encontrado para <strong>{`"${searchTerm}""`}</strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
            <ListHeader order={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Name</span>
                <img src={arrow} alt="Order Arrow" />
              </button>
            </ListHeader>
          )}

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
        </>
      )}
    </Container>
  );
}
