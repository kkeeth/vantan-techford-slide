import './AddTask.css';
import type { FormEvent } from 'react';
import type { Priority, Category } from '../types';
import { PRIORITY_LABELS, CATEGORY_LABELS } from '../types';

type AddTaskProps = {
  inputTask: string;
  setInputTask: (task: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
  priority: Priority;
  setPriority: (priority: Priority) => void;
  category: Category;
  setCategory: (category: Category) => void;
};

const AddTask = ({
  inputTask,
  setInputTask,
  handleSubmit,
  error,
  priority,
  setPriority,
  category,
  setCategory,
}: AddTaskProps) => {
  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add New Task"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        />
        <button disabled={inputTask.length === 0}>Submit</button>
      </form>
      <div className="task-options">
        <div className="priority-section">
          <span>Priority: </span>
          {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
            <label key={key}>
              <input
                type="radio"
                name="priority"
                value={key}
                checked={priority === key}
                onChange={(e) => setPriority(e.target.value as Priority)}
              />
              {label}
            </label>
          ))}
        </div>
        <div className="category-section">
          <span>Category: </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default AddTask;
