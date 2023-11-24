const taskList = ({ taskList, handleTaskChange, handleRemoveTask, filter }) => {
  const displayTasks = taskList.filter(({ isDone }) => {
    if (filter === "ALL") return true;
    if (filter === "TODO") return !isDone;
    if (filter === "DONE") return isDone;
  });

  return (
    <div className="Todo">
      {displayTasks.map(({ id, title, isDone }) => (
        <li key={id} className={isDone ? "done" : ""}>
          <input
            type="checkbox"
            checked={isDone}
            onChange={() => handleTaskChange(id)}
          />
          {title}
          <button onClick={() => handleRemoveTask(id)}>✕</button>
        </li>
      ))}
    </div>
  );
};

export default taskList;
