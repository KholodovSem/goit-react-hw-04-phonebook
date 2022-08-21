import PropTypes from 'prop-types';
import style from './ContactList.module.css';

function ContactList({ onFilterContacts, onHandleDelete }) {
  return (
    <ul className={style.ul}>
      {onFilterContacts.map((contact) => (
        <li key={contact.id} className={style.listItem}>
          <span className={style.name}>{contact.name}:</span>
          <span className={style.number}>{contact.number}</span>
          <>
          <button className={style.button}
                  onClick={() => {
                    onHandleDelete(contact)
                  }}>
            Delete
          </button>
          </>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onFilterContacts: PropTypes.func.isRequired,
  onHandleDelete: PropTypes.func.isRequired
}

export default ContactList;

