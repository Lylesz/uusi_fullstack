import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddPersonForm from './components/AddPersonForm'
import PersonDisplay from './components/PersonDisplay'
import Notification from './components/Notification'
import personService from './services/persons'




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] =useState('')
  const [actionMessage, setActionMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
      personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const personsToShow = persons.filter(person => 
    person.name.includes(filter) || person.number.includes(filter)
  ) 


  const addPerson = (event) => {
    event.preventDefault()
    
    // Check if name already exists
    
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if(window.confirm(`Päivitetäänkö henkilön ${newName} numero`)){
        const updatedPerson ={...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson =>{
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
             setActionMessage(
            `Person '${existingPerson.name}' was updated`
            )
            setTimeout(() => {
             setActionMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
           })

        }
        return
      }
      

    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
      return
    }

    personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setActionMessage(
          `Person '${personObject.name}' was added`
        )
        setTimeout(() => {
          setActionMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setActionMessage(
          `Person '${name}' was deleted`
        )
          setTimeout(() => {
          setActionMessage(null)
        }, 5000)
        })
        .catch(error => {
        setErrorMessage(
          `Person '${name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
        
    }
  }


  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Phonebook</h2>
      <Notification message={actionMessage} error={errorMessage} />
      <AddPersonForm addPerson={addPerson} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      newName={newName} newNumber={newNumber}/>
     <h2>Numbers</h2>
     <PersonDisplay personsToShow={personsToShow} handleDeleteClick={handleDeleteClick}/>
    </div>
  )

}

export default App