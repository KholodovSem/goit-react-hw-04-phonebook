import style from './Filter.module.css';
import PropTypes from 'prop-types';

function Filter({ onHandleChange, filter }) {
  return (
    <div>
      <p className={style.text}>Find contacts by name</p>
      <input
        className={style.input}
        onChange={onHandleChange}
        type='text'
        value={filter}
        name='filter'
      />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onHandleChange: PropTypes.func.isRequired
}

export default Filter;

