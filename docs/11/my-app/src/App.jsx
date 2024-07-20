import { useState } from 'react'
import './App.css'
import AddTask from "./components/AddTask"
import TaskList from "./components/TaskList"
import Filter from "./components/Filter"

const initialList = [
  {
    id: 0,
    title: "aaaaa",
    isDone: false,
  },
  {
    id: 1,
    title: "bbbbb",
    isDone: true,
  },
  {
    id: 2,
    title: "ccccc",
    isDone: false,
  },
]

const App = () => {
  const [inputTask, setInputTask] = useState("")

  return (
    <>
      <div className="todo">
        <h1>Todo List</h1>
        <AddTask inputTask={inputTask} setInputTask={setInputTask} />
        <hr />
        <Filter />
        <TaskList taskList={initialList} />
      </div>
    </>
  )
}

export default App
