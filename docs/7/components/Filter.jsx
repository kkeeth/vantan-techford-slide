const Filter = ({ value, onChange }) => {
  const handleClick = (key) => {
    onChange(key);
  };

  return (
    <>
      <div className="todo-filter">
        <input
          type="radio"
          name="filter"
          onClick={() => handleClick("ALL")}
          defaultChecked
          className={value === "ALL" ? "is-active" : ""}
        />
        <label>All</label>
        <input
          type="radio"
          name="filter"
          onClick={() => handleClick("TODO")}
          className={value === "TODO" ? "is-active" : ""}
        />
        <label>ToDo</label>
        <input
          type="radio"
          name="filter"
          onClick={() => handleClick("DONE")}
          className={value === "DONE" ? "is-active" : ""}
        />
        <label>Done</label>
      </div>
    </>
  );
};

export default Filter;
