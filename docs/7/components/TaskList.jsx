const taskList = ({ taskList, handleTaskChange, handleRemoveTask, filter }) => {
  const displayTasks = taskList.filter(({ isDone }) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !isDone;
    if (filter === "DONE") return isDone;
  });

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
    </div>
  );
};

export default taskList;
