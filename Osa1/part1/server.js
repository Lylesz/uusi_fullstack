const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// API routes
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.put('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const body = request.body
  
  const noteIndex = notes.findIndex(note => note.id === id)
 
  if (noteIndex === -1) {
    return response.status(404).json({ error: 'note not found' })
  }
  
  const updatedNote = {
    ...notes[noteIndex],
    important: body.important
  }
  
  notes[noteIndex] = updatedNote
  response.json(updatedNote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!', time: new Date().toISOString() })
})

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'dist')))

// Fallback route for React SPA
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html')
  console.log('Trying to serve:', indexPath)
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err)
      res.status(500).send('Error: React app not built. Run npm run build first.')
    }
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Static files directory:', path.join(__dirname, 'dist'))
})