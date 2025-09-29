import { useState, useEffect } from 'react'
import countryService from './services/maat'
import Filter from './components/Filter'
import CountryDisplay from './components/CountryDisplay'
import CountryInfo from './components/CountryInfo'


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] =useState('')
  const [selectedCountry, setSelectedCountry]=useState(null)

  useEffect(() => {
      countryService
      .getAll()
        .then(initialCountries=> {
        setCountries(initialCountries)
      })
  }, [])

  const countriesToShow = countries.filter(country => 
    country.name.common.includes(filter) 
  ) 

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowClick = (country) => {
   setSelectedCountry(country)
   console.log(country)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      {selectedCountry ? <CountryInfo country={selectedCountry} /> 
      : <CountryDisplay countriesToShow={countriesToShow} handleShowClick={handleShowClick}/>}
    </div>
  )
}

export default App
