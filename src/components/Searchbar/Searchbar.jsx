import { Component } from 'react';
import PropTypes from 'prop-types';

import style from './searchbar.module.css';

class Searchbar extends Component {
  state = { search: '' };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({
      search: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.button}>
            <span className={style.buttonLabel}>Search</span>
          </button>

          <input
            className={style.input}
            onChange={this.handleChange}
            value={this.state.search}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
