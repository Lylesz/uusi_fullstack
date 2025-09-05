const PersonDisplay = ({ personsToShow, handleDeleteClick }) => {
  return (
    <ul>
      {personsToShow.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDeleteClick(person.id, person.name)}>
            Delete</button>
        </li>
      ))}
    </ul>
  )
}

export default PersonDisplay