import { PageHeader } from '../../components/PageHeader';
import { ContactForm } from '../../components/ContactForm';

export function EditContact() {
  return (
    <>
      <PageHeader title="Editar João" />
      <ContactForm buttonLabel="Salvar Alterações" />
    </>
  );
}
