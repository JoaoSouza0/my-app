import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormGroup } from '../FormGroup';
import { validations } from '../../utils/validate';
import { Form, ButtonContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useErrors from '../../hooks/useErrors';

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = (name && Object.values(errors).length === 0);

  function handleNameChange({ target }) {
    setName(target.value);
    return !target.value
      ? setError({ field: 'name', message: 'Nome é obrigatório' })
      : removeError('name');
  }

  function handlePhoneChange({ target }) {
    setPhone(validations.formatPhone(target.value));
  }

  function handleEmailChange({ target }) {
    setEmail(target.value);
    const isEmailValid = target.value && !validations.isEmailValid(target.value);
    return isEmailValid
      ? setError({ field: 'email', message: 'Email não é valido' })
      : removeError('email');
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Name *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        >
          <option value="">Category</option>
          <option value="instagram">Instagram</option>
          <option value="discod">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
