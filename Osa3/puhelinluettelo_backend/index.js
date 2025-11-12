require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


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
  Person.find({}).then(people => {
    console.log('Found people:', people)
    console.log('Number of people:', people.length)
    response.json(people)
  })
})

app.get('/info', (request, response) => {
  const pvm = new Date()
  
  Person.countDocuments({}).then(count => {
    const text = 
      `<p>Phonebook has info for ${count} people</p>
      <p>${pvm}</p>`
    
    response.send(text)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
   Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  const newId = Math.floor(Math.random() * 10000)
  return String(newId)
}



app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
   })

   person.save().then(savedPerson => {
    response.json(savedPerson)
    })
    .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
   } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})