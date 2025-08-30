import { useState, useEffect, FormEvent } from 'react';
import './App.css';
import Title from './Title';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import { Task, FilterType, Priority, Category } from './types';

const initialList: Task[] = [
  {
    id: 1,
    name: 'タスク1',
    isDone: true,
    priority: 'medium' as Priority,
    category: 'work' as Category,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'タスク2',
    isDone: true,
    priority: 'low' as Priority,
    category: 'personal' as Category,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'タスク3',
    isDone: true,
    priority: 'high' as Priority,
    category: 'shopping' as Category,
    createdAt: new Date(),
  },
];

function App() {
  const [inputTask, setInputTask] = useState('');
  const [taskList, setTaskList] = useState(initialList);
  const [id, setId] = useState(initialList[initialList.length - 1].id);
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [error, setError] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('work');

  useEffect(() => {
    const items = localStorage.getItem('taskList');
    const currentId = localStorage.getItem('currentId');
    if (items) {
      const parsedItems: Task[] = JSON.parse(items);
      setTaskList(parsedItems);
    }
    if (currentId) {
      setId(Number(currentId));
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTask === '') return;

    // duplicate check
    const duplicatedTask = taskList.filter(
      (task) => task.name === inputTask,
    )[0];
    if (duplicatedTask?.name) {
      setError('There exists a task with the same name.');
      return;
    } else {
      setError('');
    }
    const newTaskList = [
      ...taskList,
      {
        id: id + 1,
        name: inputTask,
        isDone: false,
        priority,
        category,
        createdAt: new Date(),
      },
    ];

    updateTasks(newTaskList);
    setId(id + 1);
    setInputTask('');
    setPriority('medium');
    setCategory('work');
    localStorage.setItem('currentId', String(id + 1));
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
          error={error}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
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
