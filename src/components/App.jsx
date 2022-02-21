import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from '../shared/Section';

class App extends Component {
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
    const contacts = localStorage.getItem('contacts');
    if (contacts && JSON.parse(contacts).length) {
      this.setState({
        contacts: JSON.parse(contacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      const { contacts } = this.state;
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = addContact => {
    const { contacts } = this.state;
    if (
      !contacts.find(
        el => el.name.toLowerCase() === addContact.name.toLowerCase()
      )
    ) {
      addContact.id = nanoid();
      this.setState(() => {
        return { contacts: [...contacts, addContact] };
      });
    } else {
      alert(`${addContact.name} is already in contacts`);
    }
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const filterStr = filter.toLowerCase();
    const result = contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      return name.includes(filterStr);
    });
    return result;
  };

  handleSearch = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  removeContact = contactId => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContacts = contacts.filter(item => item.id !== contactId);
      return {
        contacts: newContacts,
      };
    });
  };

  render() {
    return (
      <div
        style={{
          //height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 40,
          textTransform: 'uppercase',
          color: '#010101',
          padding: '20px',
        }}
      >
        <Section title="Phonebook">
          <ContactForm addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filterContacts={this.handleSearch}
            filter={this.state.filter}
          />
          <ContactList
            contacts={this.getFilteredContacts()}
            removeContact={this.removeContact}
          />
        </Section>
      </div>
    );
  }
}

export default App;
