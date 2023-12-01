const AddTask = ({ inputTask, setInputTask, handleSubmit }) => {
  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          value={inputTask}
          placeholder="Add New Task"
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button disabled={inputTask.length === 0}>submit</button>
      </form>
    </div>
  );
};
export default AddTask;
