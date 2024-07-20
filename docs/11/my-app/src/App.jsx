import { useState } from 'react'
import './App.css'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import Filter from './components/Filter'

const initialList = [
  {
    id: 0,
    title: 'aaaaa',
    isDone: false,
  },
  {
    id: 1,
    title: 'bbbbb',
    isDone: true,
  },
  {
    id: 2,
    title: 'ccccc',
    isDone: false,
  },
]

const App = () => {
  const [inputTask, setInputTask] = useState('')
  const [id, setId] = useState(initialList[initialList.length - 1].id)
  const taskList = initialList

  const addTaskList = (newTaskList) => {
    taskList.push(newTaskList)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputTask === '') return
    const newTaskList = { id: id + 1, title: inputTask, isDone: false }
    addTaskList(newTaskList)
    setId(id + 1)
    setInputTask('')
  }

  return (
    <>
      <div className="todo">
        <h1>Todo List</h1>
        <AddTask
          inputTask={inputTask}
          setInputTask={setInputTask}
          handleSubmit={handleSubmit}
        />
        <hr />
        <Filter />
        <TaskList taskList={taskList} />
      </div>
    </>
  )
}

export default App
