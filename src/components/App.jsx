import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { PhoneForm } from './PhoneForm/PhoneForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout';
import initialContacts from '../contacts.json';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    }
    this.setState({contacts: initialContacts})

  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

}

  addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };

    if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
     return  alert(`${name} is already in contacts`)
    }
    this.setState(prevState => ({
      
        contacts: [...prevState.contacts, contact]
      
    }));
  };
  
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }))
      
  };

  changeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  findContact = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }
 
render() {
  < GlobalStyle/>
  return (
    <Layout>
      <h1>Phonebook</h1>
      <PhoneForm onSave={ this.addContact } />
      <h2>Contacts</h2>
      <Filter filter={this.state.filter} onChangeFilter={this.changeFilter } />
      <ContactList contacts={this.findContact()} onDeleteContact={ this.deleteContact} />
    
    </Layout>
  );
}
  
};
