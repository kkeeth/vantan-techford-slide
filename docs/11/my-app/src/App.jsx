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
  const [taskList, setTaskList] = useState(initialList)
  const [id, setId] = useState(initialList[initialList.length - 1].id)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputTask === '') return
    const newTaskList = [
      ...taskList,
      { id: id + 1, title: inputTask, isDone: false },
    ]
    setTaskList(newTaskList)
    setId(id + 1)
    setInputTask('')
  }

  const handleTaskChange = (index) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === index) {
        task.isDone = !task.isDone
      }
      return task
    })
    setTaskList(newTaskList)
    setInputTask('')
  }

  const handleAllRemoveTask = (updatedTasks) => {
    setTaskList(updatedTasks)
  }

  const handleRemoveTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id)
    setTaskList(newTaskList)
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
        <TaskList
          taskList={taskList}
          handleTaskChange={handleTaskChange}
          handleRemoveTask={handleRemoveTask}
          handleAllRemoveTask={handleAllRemoveTask}
        />
      </div>
    </>
  )
}

export default App
