const taskList = ({
  taskList,
  handleTaskChange,
  handleRemoveTask,
  handleAllRemoveTask,
  filter,
}) => {
  const displayTasks = taskList.filter(({ isDone }) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !isDone;
    if (filter === "DONE") return isDone;
  });
  const doneTasks = taskList.filter(({ isDone }) => isDone);

  return (
    <div className="todo-list">
      {displayTasks.map(({ id, title, isDone }) => (
        <li key={id} className={isDone ? "done" : ""}>
          <div>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => handleTaskChange(id)}
            />
            <label>{title}</label>
          </div>
          <button className="danger" onClick={() => handleRemoveTask(id)}>
            ✕
          </button>
        </li>
      ))}
      <button
        className="danger delete"
        disabled={doneTasks.length === 0 && "done"}
        onClick={() => handleAllRemoveTask()}
      >
        delete all
      </button>
    </div>
  );
};

export default taskList;
