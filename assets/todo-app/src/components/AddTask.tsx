import './AddTask.css';
import { FormEvent } from 'react';

type AddTaskProps = {
  inputTask: string
  setInputTask: (task: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const AddTask = ({ inputTask, setInputTask, handleSubmit }: AddTaskProps) => {

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add New Task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)} />
        <button disabled={inputTask.length === 0}>submit</button>
      </form>
    </div>
  );
}

export default AddTask;