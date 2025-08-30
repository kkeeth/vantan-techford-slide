import { useState, useEffect, FormEvent } from 'react';
import './App.css';
import Title from './Title';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import { Task, FilterType } from './types';

const initialList: Task[] = [
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
];

function App() {
  const [inputTask, setInputTask] = useState('');
  const [taskList, setTaskList] = useState(initialList);
  const [id, setId] = useState(initialList[initialList.length - 1].id);
  const [filter, setFilter] = useState<FilterType>('ALL');

  useEffect(() => {
    const items = localStorage.getItem('taskList');
    if (items) {
      const parsedItems: Task[] = JSON.parse(items);
      setTaskList(parsedItems);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTask === '') return;

    const newTaskList = [
      ...taskList,
      { id: id + 1, name: inputTask, isDone: false },
    ];

    updateTasks(newTaskList);
    setId(id + 1);
    setInputTask('');
  };

  const handleTaskChange = (index: number) => {
    const newTaskList = taskList.map((task) => {
      if (task.id === index) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    updateTasks(newTaskList);
    setInputTask('');
  };

  const handleAllRemoveTask = (updatedTasks: Task[]) => {
    if (window.confirm(`すべてのタスクを削除してもよいですか？`)) {
      updateTasks(updatedTasks);
    }
  };

  const handleRemoveTask = (id: number) => {
    const selectedTask = taskList.filter((task) => task.id === id)[0];
    if (window.confirm(`「${selectedTask.name}」を削除してもよいですか？`)) {
      const newTaskList = taskList.filter((task) => task.id !== id);
      updateTasks(newTaskList);
    }
  };

  const updateTasks = (newTaskList: Task[]) => {
    localStorage.setItem('taskList', JSON.stringify(newTaskList));
    setTaskList(newTaskList);
  };

  return (
    <>
      <div className="todo">
        <Title str="ToDo App" />
        <AddTask
          inputTask={inputTask}
          handleSubmit={handleSubmit}
          setInputTask={setInputTask}
        />
        <hr />
        <Filter onChange={setFilter} value={filter} />
        <TaskList
          taskList={taskList}
          filter={filter}
          handleTaskChange={handleTaskChange}
          handleRemoveTask={handleRemoveTask}
          handleAllRemoveTask={handleAllRemoveTask}
        />
      </div>
    </>
  );
}

export default App;
