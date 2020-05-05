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
    title: 'First List',
    todos: [{
      todoText: 'First todo of first list!',
      completed: true,
      dueDate: "2020-05-10"
    }]
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    todos: [{
      todoText: 'First todo of second list!',
      completed: false,
      dueDate: "2020-12-24"
    }],
  }
}

app.get('/todo', (req, res) => {
  console.log("todoList: " + JSON.stringify(todoList))
  res.send(todoList)
})

app.post('/todo/:id', function (req, res) {
  let listToUpdateID = req.params["id"]
  todoList[listToUpdateID].todos = req.body
  res.sendStatus(201)
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
