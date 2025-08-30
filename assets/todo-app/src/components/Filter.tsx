import "./Filter.css";

type FilterType = "ALL" | "TODO" | "DONE"

type FilterProps = {
  value: FilterType
  onChange: (filter: FilterType) => void
}

const Filter = ({ value, onChange }: FilterProps) => {
	const handleClick = (key: FilterType) => {
	  onChange(key)
	}

	return (
		<>
			<div className="todo-filter">
				<input
					type="radio"
					name="filter" defaultChecked
					className={value === "ALL" ? "is-active" : ""}
				  onClick={() => handleClick("ALL")}
				/>
				<label>All</label>
				<input
          type="radio"
          name="filter"
          className={value === "TODO" ? "is-active" : ""}
          onClick={() => handleClick("TODO")}
        />
				<label>ToDo</label>
				<input
          type="radio"
          name="filter"
          className={value === "DONE" ? "is-active" : ""}
          onClick={() => handleClick("DONE")}
        />
				<label>Done</label>
			</div>
		</>
	);
};

export default Filter;
