import React, { Component } from 'react';
import AddContactForm from './Form';
import ContactList from './ContactList';
import Filter from './Filter';
import style from './ContactBook.module.css';

class ContactsBook extends Component {

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    if(this.handleLoadOnLocalStorage("savedContacts") === undefined){
      return;
    }
    this.setState({
    contacts: this.handleLoadOnLocalStorage("savedContacts")
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.contacts !== this.state.contacts) {
      this.handleSaveOnLocalStorage("savedContacts", this.state.contacts)
    }
  }

  handleSaveOnLocalStorage = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error("Set state error: ", error.message);
    }
  }

    handleLoadOnLocalStorage = (key) => {
      try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
      } catch (error) {
        console.error("Get state error: ", error.message);
      }
    }

    handleChange = (e) => {
      const { name, value } = e.currentTarget;

      this.setState({
        [name]: value,
      });
    };


    filterContacts = () => {
      const { contacts, filter } = this.state;
      const normalizeFilter = filter.toLowerCase();

      return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizeFilter));
    };

  handlePush = (contact) => {
    this.setState(({ contacts }) => {
      const copyContacts = [...contacts];
      const {name} = contact;
      const includesTest = copyContacts.find((el) => el.name.toLowerCase() === name.toLowerCase())

      if (includesTest){
        return alert(`${contact.name} is already in contacts.`);
      }
      return { contacts: [contact, ...copyContacts] };


    });
  };

  handleDelete = (contact) => {
    this.setState(({contacts}) => {
      const copyContacts = [...contacts];
      const indexContact = contacts.indexOf(contact);
      copyContacts.splice(indexContact, 1);

      return {contacts: copyContacts}
    })
  }


  render() {
    const { filter } = this.state;

    return (
      <section className={style.section}>
        <h1 className={style.title}>Phonebook</h1>
        <AddContactForm onHandlePush={this.handlePush} />
        <h2 className={style.titleContact}>Contacts</h2>
        <Filter filter={filter} onHandleChange={this.handleChange} />
        <ContactList onFilterContacts={this.filterContacts()}  onHandleDelete={this.handleDelete}/>
      </section>
    );
  }
}

export default ContactsBook;

