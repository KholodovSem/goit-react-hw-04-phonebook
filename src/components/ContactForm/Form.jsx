import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import style from './Form.module.css';

function AddContactForm({ onHandlePush }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    switch (name) {

      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = e.currentTarget;
    const id = nanoid();
    const nameContact = name.value;
    const phoneNumber = number.value;
    const contact = {
      id: id,
      name: nameContact,
      number: phoneNumber,
    };


    onHandlePush(contact);
    updateState();
  };

  const updateState = () => {
    setName('');
    setNumber('');
  };
  return (
    <form onSubmit={handleSubmit} className={style.form}>

      <label className={style.label}>
        <p className={style.text}>Name</p>
        <input
          onChange={handleChange}
          value={name}
          type='text'
          name='name'
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={style.label}>
        <p className={style.text}>Phone</p>
        <input
          onChange={handleChange}
          value={number}
          type='tel'
          name='number'
          pattern='\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}'
          title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
          required
        />
      </label>
      <button type='submit' className={style.button}>Send</button>
    </form>
  );
}

AddContactForm.propTypes = {
  onHandlePush: PropTypes.func.isRequired
}

export default AddContactForm;

