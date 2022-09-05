require('dotenv/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const ToDo = require('./models/Todo')

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(`${process.env.DB_CONNECTION}/${process.env.DB_NAME}`)
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database i think'))

app.get('/', (req, res) => {
    res.send('hello from server')
})

app.get('/todo', async (req, res) => {
    try {
        const todos = await ToDo.find()
        res.status(200).send(todos)
    } catch (err) {
        console.log(err)
        res.status(500).send({message: 'something went wrong'})
    }
})

app.post('/todo', async (req, res) => {
    const newTodo = new ToDo({
        todo: req.body.todo
    })

    try {
        const savedTodo = await newTodo.save()
        res.json(savedTodo)
    } catch (err) {
        console.log(err)
        res.status(500).send({message: 'Failed to add new todo item'})
    }
})

app.delete('/todo/:id', async (req, res) => {
    const {id} = req.params
    await ToDo.deleteOne({ _id: id })
    res.status(200).send({message: 'Deleted Todo'})
})

app.listen(3001, () => {
    console.log('node server started at port 3001')
})