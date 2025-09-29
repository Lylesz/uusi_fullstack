import CountryInfo from './CountryInfo'

const CountryDisplay = ({ countriesToShow, handleShowClick }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many results, please narrow the search
      </div>
    )
  }

  if (countriesToShow.length === 1) {
    return <CountryInfo country={countriesToShow[0]} />
  }

  return (
    <ul>
      {countriesToShow.map((country) => (
        <li key={country.name.common}>
          {country.name.common} {' '}
          <button onClick={() => handleShowClick(country)}>Show Info</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryDisplay