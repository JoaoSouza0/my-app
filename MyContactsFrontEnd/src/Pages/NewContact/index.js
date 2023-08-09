import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import CategoryService from '../../services/CategoryService';

export function NewContact() {
  function handleSubmit(formData) {
    const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId,
    };

    return CategoryService.createContact(contact);
  }

  return (
    <>
      <PageHeader title="New contact" />
      <ContactForm onSubmit={handleSubmit} buttonLabel="Cadastrar" />
    </>
  );
}
