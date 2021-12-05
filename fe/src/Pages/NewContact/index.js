import { PageHeader } from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/PageHeader/Button';

export function NewContact() {
  return (
    <>
      <PageHeader title="New contact" />
      <Input type="text" placeholder="Name" />
      <Select>
        <option value="Instagem">Instagram</option>
        <option value="Instagem">Instagram</option>
        <option value="Instagem">Instagram</option>
      </Select>
      <Button>
        Salvar Alterações
      </Button>
      <Button disabled>
        Salvar Alterações
      </Button>
    </>
  );
}
