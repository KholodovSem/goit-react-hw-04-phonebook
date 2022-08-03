import style from './Filter.module.css';

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

export default Filter;
