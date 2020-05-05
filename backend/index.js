const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3001

let todoList = {
  '0000000001': {
    id: '0000000001',
    title: 'Make a seagul friend',
    todos: [{
      todoText: 'Visit seagul store',
      completed: true,
      dueDate: "2020-05-03"
    },
    {
      todoText: 'Buy seagul',
      completed: true,
      dueDate: "2020-05-15"
    },
    {
      todoText: 'Teach seagul tango',
      completed: false,
      dueDate: "2020-06-01"
    }]
  },
  '0000000002': {
    id: '0000000002',
    title: 'Ingredients for oatmeal porridge',
    todos: [{
      todoText: 'Buy water',
      completed: true,
      dueDate: "2020-05-10"
    },
    {
      todoText: 'Buy oats',
      completed: true,
      dueDate: "2020-05-10"
    }],
  }
}

app.get('/todo', (req, res) => {
  res.send(todoList)
})

app.post('/todo/:id', function (req, res) {
  let listToUpdateID = req.params["id"]
  todoList[listToUpdateID].todos = req.body
  res.sendStatus(201)
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
