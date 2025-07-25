import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = ({text, onClick}) => {
    return (
      <button onClick={onClick}>{text}</button>
    )
  }

  const StatisticLine =({text, value}) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }

  const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
      return (
        <div>
          <h2>statistiikka</h2>
          <p>ei yhtään palautetta annettu</p>
        </div>
      )
    }
    return (
      <div>
        <h2>statistiikka</h2>
        <table>
          <tbody>
            <StatisticLine text="hyvä" value={good} />
            <StatisticLine text="neutraali" value={neutral} />
            <StatisticLine text="huono" value={bad} />
            <StatisticLine text="yhteensä" value={good + neutral + bad} />
            <StatisticLine text="keskiarvo" value={(good - bad) / (good + neutral + bad)} />
            <StatisticLine text="positiivisia" value={good / (good + neutral + bad)} />
          </tbody>
        </table>
      </div>
    )
  }

  const handleGoodClick = () => {
  setGood(good + 1)
  console.log('good', good + 1)
  }
  const handleNeutralClick = () => {
  setNeutral(neutral + 1)
  console.log('neutral', neutral + 1)
  }
  const handleBadClick = () => {
  setBad(bad + 1)
    console.log('bad', bad + 1)
  }

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button text='good' onClick={handleGoodClick} />
      <Button text='neutral' onClick={handleNeutralClick} />
      <Button text='bad' onClick={handleBadClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
  
  


