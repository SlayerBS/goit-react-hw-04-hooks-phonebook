import React, { useState, useEffect } from "react";
import ContactList from "./components/ContactList";

import Container from "./components/Container";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Section from "./components/Section";

export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts")) ?? [];
  }); //lazy state ititialization
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

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

  const handleFilter = (filterQuery) => setFilterQuery(filterQuery);

  const deleteContact = (deletedId) => {
    setContacts(contacts.filter((contact) => contact.id !== deletedId));
  };

  const filteredContacts = () => {
    console.log(contacts, filterQuery);
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  };

  return (
    <Container>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filterQuery} onChange={handleFilter} />
        <ContactList contacts={filteredContacts()} onDelete={deleteContact} />
      </Section>
    </Container>
  );
}
