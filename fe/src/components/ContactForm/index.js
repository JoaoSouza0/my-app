import PropTypes from 'prop-types';
import { Form, ButtonContainer } from './styles';
import { FormGroup } from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

export function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Name" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Email" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="insta">instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
