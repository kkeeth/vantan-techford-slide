const AddTask = ({ inputTask, setInputTask, handleSubmit }) => {
  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add New Task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button disabled={inputTask.length === 0}>submit</button>
      </form>
    </div>
  )
}
export default AddTask
