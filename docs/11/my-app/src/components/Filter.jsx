const Filter = () => {
  return (
    <>
      <div className="todo-filter">
        <input
          type="radio"
          name="filter"
          defaultChecked
        />
        <label>All</label>
        <input
          type="radio"
          name="filter"
        />
        <label>ToDo</label>
        <input
          type="radio"
          name="filter"
        />
        <label>Done</label>
      </div>
    </>
  )
}

export default Filter
