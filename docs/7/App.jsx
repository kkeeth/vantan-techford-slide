import { useState, useEffect } from "react";
import "./App.css";

import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Filter from "./components/Filter";

const KEY = "TODO";
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
];

const App = () => {
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem(KEY)) || initialList
  );
  const [inputTask, setInputTask] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [id, setId] = useState(0);

  useEffect(() => {
    if (taskList.length === 0) {
      setId(0);
    } else {
      setId(taskList.slice(-1)[0].id + 1);
    }
  }, []);

  const handleTaskChange = (index) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === index) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    setTaskList(newTaskList);
    localStorage.setItem(KEY, JSON.stringify(newTaskList));
  };

  const handleRemoveTask = (id) => {
    const newTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(newTaskList);
    localStorage.setItem(KEY, JSON.stringify(newTaskList));
  };

  const handleAllRemoveTask = () => {
    setTaskList([]);
    localStorage.setItem(KEY, JSON.stringify([]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTask === "") return;
    const newTaskList = [
      ...taskList,
      { id: id + 1, title: inputTask, isDone: false },
    ];
    setTaskList(newTaskList);
    setId(id + 1);
    localStorage.setItem(KEY, JSON.stringify(newTaskList));
    setInputTask("");
  };

  return (
    <article className="todo">
      <h1>Todo List</h1>

      <AddTask
        inputTask={inputTask}
        handleSubmit={handleSubmit}
        setInputTask={setInputTask}
      />
      <hr />
      <Filter onChange={setFilter} value={filter} />
      <TaskList
        filter={filter}
        taskList={taskList}
        handleRemoveTask={handleRemoveTask}
        handleAllRemoveTask={handleAllRemoveTask}
        handleTaskChange={handleTaskChange}
      />
    </article>
  );
};

export default App;
