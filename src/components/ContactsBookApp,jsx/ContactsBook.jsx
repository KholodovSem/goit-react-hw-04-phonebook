import { useState } from 'react';
import AddContactForm from './Form';
import ContactList from './ContactList';
import Filter from './Filter';
import style from './ContactBook.module.css';
import useLocalStorage from '../../hooks/useLocalStorage';
import arrayContacts from '../../jsonData/arrayContacts.json';

function ContactsBook() {
  const [contacts, setContacts] = useLocalStorage('savedContacts', arrayContacts);

  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    const value = e.currentTarget.value;

    setFilter(value);
  };

  const filterContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizeFilter));
  };

  const handlePush = (contact) => {
    const copyContacts = [...contacts];
    const { name } = contact;
    const includesTest = copyContacts.find((el) => el.name.toLowerCase() === name.toLowerCase());

    if (includesTest) {
      return alert(`${contact.name} is already in contacts.`);
    }
    return setContacts([contact, ...copyContacts]);
  };

  const handleDelete = (contact) => {
    const copyContacts = [...contacts];
    const indexContact = contacts.indexOf(contact);
    copyContacts.splice(indexContact, 1);

    return setContacts(copyContacts);
  };

  return (
    <section className={style.section}>
      <h1 className={style.title}>Phonebook</h1>
      <AddContactForm onHandlePush={handlePush} />
      <h2 className={style.titleContact}>Contacts</h2>
      <Filter filter={filter} onHandleChange={handleChange} />
      <ContactList onFilterContacts={filterContacts()} onHandleDelete={handleDelete} />
    </section>
  );
}

export default ContactsBook;

