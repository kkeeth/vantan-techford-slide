const AddTask = ({ inputTask, setInputTask }) => {
  return (
    <div className="todo-form">
      <form>
        <input
          placeholder="Add New Task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  )
}
export default AddTask
