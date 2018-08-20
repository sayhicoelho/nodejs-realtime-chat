const express = require('express')
const dotenv = require('dotenv-safe')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const router = require('./router')

dotenv.load()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(`${__dirname}/views`))

router(app)

io.on('connection', socket => {
  console.log('user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('chat message', message => {
    console.log(`message: ${message}`)

    io.emit('chat message', message)
  })
})

http.listen(process.env.PORT)

console.log(`App started on http://127.0.0.1:${process.env.PORT}`)
