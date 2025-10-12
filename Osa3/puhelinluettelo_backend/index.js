const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

let persons =[
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },

    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-523523"
    },

      {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-245789"
    },

      {
        id: "4",
        name: "Mart Poppendieck",
        number: "39-23-315674"
    },
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const pvm= new Date()
  const henkiloMaara = persons.length
  
  const text = 
    `<p>Phonebook has info for ${henkiloMaara} people</p>
    <p>${pvm}</p>`
  
  response.send(text)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
   if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  console.log('delete')
  
  response.status(204).end()
})
const generateId = () => {
  const newId = Math.floor(Math.random() * 10000)
  return String(newId)
}


app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('Request body:', body)

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  

  const person = {
    name: body.name,
    number: body.number, 
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})