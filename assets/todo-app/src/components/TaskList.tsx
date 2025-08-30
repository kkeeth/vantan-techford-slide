import './TaskList.css';

type Task = {
  id: number;
  name: string;
  isDone: boolean;
};

type FilterType = 'ALL' | 'TODO' | 'DONE';

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
      {displayTasks.length > 0 ? (
        displayTasks.map(({ id, name, isDone }) => (
          <li key={id} className={isDone ? 'done' : ''}>
            <div>
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => handleTaskChange(id)}
              />
              <label>{name}</label>
            </div>
            <button className="danger" onClick={() => handleRemoveTask(id)}>
              ×
            </button>
          </li>
        ))
      ) : (
        <p className="no-task">タスクを追加してください</p>
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
