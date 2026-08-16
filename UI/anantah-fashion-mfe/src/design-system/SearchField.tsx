import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function SearchField({ id, label, ...props }: SearchFieldProps) {
  return (
    <label className="fashion-search-field" htmlFor={id}>
      <Search size={16} aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
      <input id={id} type="search" {...props} />
    </label>
  );
}