function Select(props) {
    const { name, options, onChange } = props;

    return (
      <select name={name} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
  
  
  export default Select;