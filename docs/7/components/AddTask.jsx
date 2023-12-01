const AddTask = (props) => {
  return (
    <div className="todo-form">
      <form onSubmit={props.handleSubmit}>
        <input
          value={props.inputTask}
          placeholder="Add New Task"
          onChange={(e) => props.setInputTask(e.target.value)}
        />
        <button disabled={props.inputTask.length === 0}>submit</button>
      </form>
    </div>
  );
};
export default AddTask;
