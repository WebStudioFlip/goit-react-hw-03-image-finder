import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './contactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const {addContact} = this.props;    
    addContact(this.state);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={style.form} onSubmit={this.handleFormSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="" className={style.formGroupLabel}>
            Name
          </label>
          <input
            className={style.formGroupInput}
            onChange={this.handleChange}
            value={name}
            type="text"
            name="name"
            placeholder="Enter Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="" className={style.formGroupLabel}>
            Number
          </label>
          <input
            type="tel"
            value={number}
            className={style.formGroupInput}
            onChange={this.handleChange}
            placeholder="Enter Phone"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="" className={style.formGroupLabel}></label>
          <button className={style.btn} type="submit">
            Добавить
          </button>
        </div>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func,
};
