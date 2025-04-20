import "./TaskList.css";

const TaskList = ({ taskList, handleTaskChange, handleRemoveTask, handleAllRemoveTask, filter }) => {
	const todoTasks = taskList.filter(({ isDone }) => !isDone);
	const displayTasks = taskList.filter(({ isDone }) => {
		if (filter === "ALL") return true
		if (filter === "TODO") return !isDone
		if (filter === "DONE") return isDone
	})

	return (
		<ul className="todo-list">
			{displayTasks.map(({ id, name, isDone }) => (
				<li key={id} className={isDone ? "done" : ""}>
					<div>
						<input
							type="checkbox"
							checked={isDone}
							onChange={() => handleTaskChange(id)}
						/>
						<label>{name}</label>
					</div>
					<button className="danger" onClick={() => handleRemoveTask(id)}>×</button>
				</li>
			))}
			<button
				className="danger delete"
				disabled={todoTasks.length === taskList.length && "done"}
				onClick={() => handleAllRemoveTask(todoTasks)}
			>
				delete all
			</button>
		</ul>
	);
};

export default TaskList;
