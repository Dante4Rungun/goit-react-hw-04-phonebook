import React from "react";
import styled from "./Phonebook.module.css"
import { ContactForm } from "components/ContactForm/ContactForm";
import { nanoid } from 'nanoid'
import { Filter } from "components/Filter/Filter";
import { ContactList } from "components/ContactList/ContactList";
import Notiflix from "notiflix";
import { useEffect } from "react";
import { useState } from "react";

export const Phonebook = () => {
    
    const [contacts, setContacts] = useState([])
    const [name, setName] = useState('')
    
    const addContact = () => {
        const name = document.getElementById('name').value
        const number = document.getElementById('number').value
        const id = nanoid()
        if (name === "" || number === "") {
            Notiflix.Notify.warning("Please fill all contact data")
        }
        else {
            setContacts(prevContacts => [...prevContacts, ...[{ id, name, number }]])
            addToLocalStorage([...contacts,...[{ id, name, number }]])
        }
    }

    const setFilter = (event) => {
        setName(document.getElementById('contact-search').value)
    }

    const addToLocalStorage = (stateContacts) => {
        localStorage.setItem('contacts',JSON.stringify(stateContacts))
    }
    
    const addContactWithCheck = (event) => {
        const name = document.getElementById('name').value
        if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase()) === undefined) {
            addContact()
        }
        else {
            alert(`${name} is already in contacts`)
        }
    }

    const removeFromContacts = (event) => {  
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== event.target.getAttribute("data-delete")))
        addToLocalStorage(contacts.filter(contact => contact.id !== event.target.getAttribute("data-delete")))
    }

    useEffect(() => {
        const dataLocalStorage = JSON.parse(localStorage.getItem('contacts'))
        if (dataLocalStorage != null) 
            setContacts(dataLocalStorage) 
    }, [])

    return (
        <div className={styled.phonebook}>
            <h1 className={styled.phonebook__title}>Phonebook</h1 >
            <ContactForm addContact={addContactWithCheck} />
            <h2 className={styled.phonebook__contacts}>Contacts</h2>
            <Filter setFilter={setFilter} />
            <ContactList contacts={contacts} filter={name} removeFromContacts={removeFromContacts} />
        </div>
    )
}