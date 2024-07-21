const TaskList = ({ taskList, handleTaskChange, handleAllRemoveTask }) => {
  const todoTasks = taskList.filter(({ isDone }) => !isDone)

  return (
    <ul className="todo-list">
      {taskList.map(({ id, title, isDone }) => (
        <li
          key={id}
          className={isDone ? 'done' : ''}
        >
          <div>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => handleTaskChange(id)}
            />
            <label>{title}</label>
          </div>
          <button className="danger">✕</button>
        </li>
      ))}
      <button
        className="danger delete"
        disabled={todoTasks.length === taskList.length && 'done'}
        onClick={() => handleAllRemoveTask(todoTasks)}
      >
        delete all
      </button>
    </ul>
  )
}

export default TaskList
