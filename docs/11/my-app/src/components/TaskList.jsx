const TaskList = ({ taskList }) => {
  return (
    <ul className="todo-list">
      {taskList.map(({ id, title }) => (
        <li key={id}>
          <div>
            <input type="checkbox" />
            <label>{title}</label>
          </div>
          <button className="danger">✕</button>
        </li>
      ))}
      <button className="danger delete">delete all</button>
    </ul>
  )
}

export default TaskList
