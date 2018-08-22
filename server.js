const express = require('express')
const dotenv = require('dotenv-safe')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

dotenv.load()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(`${__dirname}/views`))

app.get('/', (req, res) => {
  res.render('index.html')
})

let users = []

io.on('connection', socket => {
  socket.on('addUser', username => {
    users[username] = socket.id
    socket.username = username
    socket.join('chat')

    io.to('chat').emit('message', {
      sender: 'server',
      to: null,
      text: `${username} connected.`
    }, Object.keys(users).length)
  })

  socket.on('changeUsername', (oldUsername, newUsername) => {
    if (typeof users[newUsername] != 'undefined') // already exists
      return

    socket.username = newUsername
    users[newUsername] = socket.id
    delete users[oldUsername]

    io.to('chat').emit('message', {
      sender: 'server',
      to: null,
      text: `User "${oldUsername}" changed to "${newUsername}".`
    }, Object.keys(users).length)
  })

  socket.on('message', message => {
    const sender = message.sender
    const text = message.text
    const to = message.to

    const data = { sender, to, text }

    if (!to) {
      io.to('chat').emit('message', data, Object.keys(users).length)
    }
    else if (typeof users[to] != 'undefined' && to != sender) {
      socket.emit('message', data, Object.keys(users).length)
      socket.broadcast.to(users[to]).emit('message', data, Object.keys(users).length)
    }
  })

  socket.on('disconnect', () => {
    delete users[socket.username]

    io.to('chat').emit('message', {
      sender: 'server',
      to: null,
      text: `${socket.username} disconnected`
    }, Object.keys(users).length)

    socket.leave('chat')
  })
})

http.listen(process.env.PORT)

console.log(`App started on http://127.0.0.1:${process.env.PORT}`)
