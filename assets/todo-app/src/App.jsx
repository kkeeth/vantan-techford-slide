import { useState, useEffect } from 'react'
import './App.css'
import Title from './Title';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Filter from './components/Filter';

const initialList = [
  {
    id: 1,
    name: 'タスク1',
    isDone: true,
  },
  {
    id: 2,
    name: 'タスク2',
    isDone: true,
  },
  {
    id: 3,
    name: 'タスク3',
    isDone: true,
  },
]

function App() {
  const [inputTask, setInputTask] = useState("")
  const [taskList, setTaskList] = useState(initialList)
  const [id, setId] = useState(initialList[initialList.length - 1].id)
  const [filter, setFilter] = useState("ALL")

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("taskList"))
    console.log(items)
    if (items) {
      setTaskList(items)
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputTask === "") return

    const newTaskList = [
      ...taskList,
      { id: id + 1, name: inputTask, isDone: false }
    ]

    updateTasks(newTaskList)
    setId(id + 1)
    setInputTask("")
  }

  const handleTaskChange = (index) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === index) {
        task.isDone = !task.isDone
      }
      return task
    })
    updateTasks(newTaskList)
    setInputTask("")
  }

  const handleAllRemoveTask = (updatedTasks) => {
    updateTasks(updatedTasks)
  }

  const handleRemoveTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id)
    updateTasks(newTaskList)
  }

  const updateTasks = (newTaskList) => {
    localStorage.setItem("taskList", JSON.stringify(newTaskList))
    setTaskList(newTaskList)
  }

  return (
    <>
      <div className="todo">
        <Title str="ToDo App" />
        <AddTask
          inputTask={inputTask}
          handleSubmit={handleSubmit}
          setInputTask={setInputTask} />
        <hr />
        <Filter onChange={setFilter} value={filter} />
        <TaskList
          taskList={taskList}
          filter={filter}
          handleTaskChange={handleTaskChange}
          handleRemoveTask={handleRemoveTask}
          handleAllRemoveTask={handleAllRemoveTask} />
      </div>
    </>
  )
}

export default App
