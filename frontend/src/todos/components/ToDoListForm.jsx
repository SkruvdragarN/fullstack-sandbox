import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)
  const [changeMade, setChangeMade] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
  }

  function daysLeftToDateStr(dateStr) {
    let dueDate = new Date(dateStr)
    let currentDate = new Date()

    let diffInTime = dueDate.getTime() - currentDate.getTime()
    let diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24)) + 1

    if (diffInDays === 0) {
      return "Due today"
    } else if (diffInDays < 0) {
      return Math.abs(diffInDays) + " days overdue"
    } else {
      return diffInDays + " days due"
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {

      if (changeMade) {
        saveToDoList(toDoList.id, { todos })
        setChangeMade(false)
      }

    }, 100);
    return () => clearInterval(timer);
  }, [changeMade, saveToDoList, toDoList.id, todos]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                label='What to do?'
                value={todo.todoText}
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    { todoText: event.target.value, completed: todo.completed, dueDate: todo.dueDate },
                    ...todos.slice(index + 1)
                  ])
                  setChangeMade(true)
                }}
                className={classes.textField}
              />

              <TextField
                id="date"
                label="Set due date"
                type="date"
                defaultValue={todo.dueDate}
                className={classes.textField}
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    { todoText: todo.todoText, completed: todo.completed, dueDate: event.target.value },
                    ...todos.slice(index + 1)
                  ])
                  setChangeMade(true)
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Days left"
                disabled={true}
                value={daysLeftToDateStr(todo.dueDate)}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Checkbox
                color='primary'
                checked={todo.completed ?? false}
                title="Check when completed"
                aria-label="check when completed"
                onChange={event => {
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    { todoText: todo.todoText, completed: !todo.completed, dueDate: todo.dueDate },
                    ...todos.slice(index + 1)
                  ])
                  setChangeMade(true)
                }}
                inputProps={{ 'aria-label': 'Check when completed' }}
              />
              <Button
                title="Delete todo"
                aria-label="delete todo"
                size='small'
                color='secondary'
                type='submit'
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
                  setChangeMade(true)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, { todoText: '', completed: false, dueDate: (new Date()).toISOString().split('T')[0] }])
                setChangeMade(true)
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}


