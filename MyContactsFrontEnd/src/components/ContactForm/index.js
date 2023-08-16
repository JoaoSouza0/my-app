import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormGroup } from '../FormGroup';
import { validations } from '../../utils/validate';
import { Form, ButtonContainer } from './styles';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useErrors from '../../hooks/useErrors';
import CategoryService from '../../services/CategoryService';
import { toastEventManager } from '../../utils/toast';

export function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = name && Object.values(errors).length === 0;

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoryService.listCategories();
        setCategories(categoriesList);
      } catch {
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

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

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({
        name,
        email,
        phone,
        categoryId,
      });
      toastEventManager.emit('addtoast', {
        type: 'success',
        text: 'Contato cadastrado com sucesso',
      });
    } catch (error) {
      toastEventManager.emit('addtoast', {
        type: 'danger',
        text: error.message,
      });
    }

    setIsSubmitting(false);
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          disabled={isSubmitting}
          error={getErrorMessageByFieldName('name')}
          placeholder="Name *"
          value={name}
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          disabled={isSubmitting}
          type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          disabled={isSubmitting}
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          disabled={isLoadingCategories || isSubmitting}
          onChange={({ target }) => setCategoryId(target.value)}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
