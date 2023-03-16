import  { useState, useEffect} from 'react';

import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { PhoneForm } from './PhoneForm/PhoneForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout';
import initialContacts from '../contacts.json';

export const App =()=> {
const [contacts, setContacts] = useState(()=> {
 const savedContacts = localStorage.getItem('contacts');
 if (savedContacts !== null) {
  const parsedContacts = JSON.parse(savedContacts);
  return parsedContacts;
 } 
 return initialContacts;})
 
const [filter, setFilter] = useState('');

useEffect(() => {
  window.localStorage.setItem('contacts',JSON.stringify(contacts))
}, [contacts]);


  const addContact = ({name, number}) => {
    const contact = { id: nanoid(), name, number };

    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase() || contact.number === number)) {
     return  alert(`${name} is already in contacts`)
    }
    setContacts([ ...contacts, contact]);
  };  
  
  
  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id)) 
  };

  const  changeFilter = evt => {
    setFilter(evt.target.value );
  };

  const findContact = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  }
 

  return (
   
    <Layout>
      <h1>Phonebook</h1>
      <PhoneForm onSave={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeFilter={changeFilter} />
      <ContactList contacts={findContact()} onDeleteContact={deleteContact} />
    < GlobalStyle/>
    </Layout>
  );
}
  

