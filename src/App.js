import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";

import Container from "./components/Container";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Section from "./components/Section";

export default function App() {
 
    const [contacts, setContacts]=useState([]);
    const [filter, setFilter]=useState("");
  

  useEffect(()=> {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }}, []
  );

  useEffect(() => {    
       localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]
  );

  const addContact = (data) => {
    if (contacts.find((contact) => contact.name === data.name)) {
      alert(
        `${data.name} is already in contacts with contact number ${data.number} `
      );
      return;
    }
    setContacts([data, ...contacts]);
    console.log("Contacts", contacts);
  };

  const handleFilter = (filter) => setFilter({ filter });

  const deleteContact = (deletedId) => {
    setContacts((prevState) => ({
      contacts: prevState.filter(
        (contact) => contact.id !== deletedId
      ),
    }));
  };

  const filteredContacts = () => {
    console.log(contacts);
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
    
    return (
      <Container>
        <Section title="Phonebook">
          <ContactForm onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter filter={filter} onChange={handleFilter} />
          <ContactList
            contacts={filteredContacts()}
            onDelete={deleteContact()}
          />
        </Section>
      </Container>
    );
  
}

