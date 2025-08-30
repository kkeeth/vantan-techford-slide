import './TaskList.css';
import {
  Task,
  FilterType,
  PRIORITY_LABELS,
  CATEGORY_LABELS,
  PRIORITY_COLORS,
} from '../types';

type TaskListProps = {
  taskList: Task[];
  handleTaskChange: (id: number) => void;
  handleRemoveTask: (id: number) => void;
  handleAllRemoveTask: (tasks: Task[]) => void;
  filter: FilterType;
};

const TaskList = ({
  taskList,
  handleTaskChange,
  handleRemoveTask,
  handleAllRemoveTask,
  filter,
}: TaskListProps) => {
  const todoTasks = taskList.filter(({ isDone }) => !isDone);
  const displayTasks = taskList.filter(({ isDone }) => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO') return !isDone;
    if (filter === 'DONE') return isDone;
  });

  return (
    <ul className="todo-list">
      {displayTasks.length === 0 && filter === 'ALL' ? (
        <p className="no-task">タスクを追加してください</p>
      ) : (
        displayTasks.map(({ id, name, isDone, priority, category }) => (
          <li key={id} className={isDone ? 'done' : ''}>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => handleTaskChange(id)}
            />
            <span
              className="priority-label"
              style={{ backgroundColor: PRIORITY_COLORS[priority] }}
            >
              {PRIORITY_LABELS[priority]}
            </span>
            <label className="task-name">{name}</label>
            <span className="category-label">{CATEGORY_LABELS[category]}</span>
            <button className="danger" onClick={() => handleRemoveTask(id)}>
              ×
            </button>
          </li>
        ))
      )}
      <button
        className="danger delete"
        disabled={todoTasks.length === taskList.length}
        onClick={() => handleAllRemoveTask(todoTasks)}
      >
        delete all
      </button>
    </ul>
  );
};

export default TaskList;
