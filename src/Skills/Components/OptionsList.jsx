function OptionsList({ options, selected, onSelect }) {
  return (
    <div>
      {options.map((opt, i) => (
        <div key={i}>
          <input
            type="radio"
            checked={selected === opt}
            onChange={() => onSelect(opt)}
          />
          {opt}
        </div>
      ))}
    </div>
  );
}

export default OptionsList;