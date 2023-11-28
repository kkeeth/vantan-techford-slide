const AddTask = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      Add Task
      <input
        value={props.inputTask}
        placeholder="Add New Task"
        onChange={(e) => props.setInputTask(e.target.value)}
      />
      <button disabled={props.inputTask.length === 0}>submit</button>
    </form>
  );
};
export default AddTask;
