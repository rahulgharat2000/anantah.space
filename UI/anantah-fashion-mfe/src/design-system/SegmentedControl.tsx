type SegmentedControlProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  value: string;
};

export function SegmentedControl({ label, onChange, options, value }: SegmentedControlProps) {
  return (
    <div className="fashion-segmented-control" role="tablist" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="tab"
          aria-selected={value === option}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}