import { useState } from "react";
import "./Todo.css";

import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import Filter from "./components/Filter";

const Todo = () => {
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
  const [taskList, setTaskList] = useState(initialList);
  const [inputTask, setInputTask] = useState("");
  const [filter, setFilter] = useState("ALL");

  const handleTaskChange = (index) => {
    const newTaskList = taskList.map((task, taskIndex) => {
      if (taskIndex === index) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    setTaskList(newTaskList);
  };

  const handleRemoveTask = (index) => {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputTask === "") return;
    setTaskList((taskList) => [
      ...taskList,
      { id: taskList.length, title: inputTask, isDone: false },
    ]);
    setInputTask("");
  };

  return (
    <>
      <h1>Todo List</h1>
      <Filter onChange={setFilter} value={filter} />
      <AddTask
        inputTask={inputTask}
        handleSubmit={handleSubmit}
        setInputTask={setInputTask}
      />
      <TaskList
        filter={filter}
        taskList={taskList}
        handleRemoveTask={handleRemoveTask}
        handleTaskChange={handleTaskChange}
      />
    </>
  );
};

export default Todo;
