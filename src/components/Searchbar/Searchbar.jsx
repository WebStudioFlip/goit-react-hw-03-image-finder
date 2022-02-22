import { useState } from "react";
import PropTypes from 'prop-types';

import style from './searchbar.module.css'

const Searchbar = ({onSubmit})=> {

    const [form, setForm] = useState({
        search: ""
    });

    const handleSubmit = (e)=> {
        e.preventDefault();
        onSubmit(form);
        setForm({
            search: ""
        })
    }

    const handleChange = ({target}) => {
        const {name, value} = target;
        setForm(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }


return (
    <header className={style.searchbar}>
  <form className={style.form} onSubmit={handleSubmit}>
    <button type="submit" className={style.button}>
      <span className={style.buttonLabel}>Search</span>
    </button>

    <input
      className={style.input}
      onChange={handleChange} 
      value={form.search} 
      name="search"
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
)

}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};