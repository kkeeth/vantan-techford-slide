import './AddTask.css';
import { FormEvent } from 'react';

type AddTaskProps = {
  inputTask: string;
  setInputTask: (task: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
};

const AddTask = ({
  inputTask,
  setInputTask,
  handleSubmit,
  error,
}: AddTaskProps) => {
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
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default AddTask;
