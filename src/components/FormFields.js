import { useState, useRef, useEffect } from "react";

export function FormGroup({ title, children }) {
  return (
    <div className="flex flex-col gap-5 mb-8">
      {title && (
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-violet-400 mb-1">
          {title}
        </h3>
      )}
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

export function TextInput({ label, id, name, placeholder, value, onChange, error, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-[#8888a0] tracking-wide">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-3 rounded-xl text-[15px] text-white placeholder-[#55556a] bg-[rgba(255,255,255,0.05)] border outline-none transition-colors duration-150 focus:border-[rgba(124,58,237,0.6)] focus:ring-1 focus:ring-[rgba(124,58,237,0.6)] ${
          error ? "border-red-500/60 animate-pulse" : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
        }`}
      />
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}

export function AutocompleteInput({ label, id, name, placeholder, value, onChange, error, required, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef(null);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes((value || "").toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        e.preventDefault();
        onChange({ target: { name, value: filteredOptions[highlightedIndex] } });
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 relative" ref={wrapperRef}>
      <label htmlFor={id} className="text-[13px] font-medium text-[#8888a0] tracking-wide">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          setIsOpen(true);
          setHighlightedIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        required={required}
        autoComplete="off"
        className={`w-full px-4 py-3 rounded-xl text-[15px] text-white placeholder-[#55556a] bg-[rgba(255,255,255,0.05)] border outline-none transition-colors duration-150 focus:border-[rgba(124,58,237,0.6)] focus:ring-1 focus:ring-[rgba(124,58,237,0.6)] ${
          error ? "border-red-500/60 animate-pulse" : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
        }`}
      />
      
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-50 top-[calc(100%+8px)] left-0 w-full max-h-60 overflow-y-auto rounded-xl bg-[#1a1a24] border border-[rgba(255,255,255,0.1)] shadow-2xl py-2 m-0 list-none custom-scrollbar">
          {filteredOptions.map((opt, idx) => (
            <li
              key={opt}
              onClick={() => {
                onChange({ target: { name, value: opt } });
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
              className={`px-4 py-2.5 cursor-pointer text-[15px] transition-colors ${
                idx === highlightedIndex ? "bg-violet-500/20 text-white" : "text-[#a0a0b4] hover:bg-[rgba(255,255,255,0.05)] hover:text-white"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
      
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}

export function SelectInput({ label, id, name, options, value, onChange, error, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-[#8888a0] tracking-wide">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`appearance-none w-full px-4 py-3 rounded-xl text-[15px] bg-[rgba(255,255,255,0.05)] border outline-none transition-colors duration-150 focus:border-[rgba(124,58,237,0.6)] focus:ring-1 focus:ring-[rgba(124,58,237,0.6)] ${
            value ? "text-white" : "text-[#55556a]"
          } ${
            error ? "border-red-500/60 animate-pulse" : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
          }`}
        >
          <option value="" disabled>Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#1a1a24] text-white">
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8888a0]">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}

export function PillSelect({ label, name, options, value, onChange, error, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-medium text-[#8888a0] tracking-wide">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        {options.map((opt) => {
          const isSelected = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ target: { name, value: opt } })}
              className={`flex-1 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-150 border ${
                isSelected
                  ? "bg-[rgba(124,58,237,0.2)] border-[rgba(124,58,237,0.6)] text-violet-300"
                  : "bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-[#a0a0b4] hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.08)]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}

export function NumberInput({ label, id, name, value, onChange, min, max, step, suffix, error, required }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-[#8888a0] tracking-wide">
        {label} {required && <span className="text-violet-400">*</span>}
      </label>
      <div className="relative">
        <input
          type="number"
          id={id}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full px-4 py-3 rounded-xl text-[15px] text-white bg-[rgba(255,255,255,0.05)] border outline-none transition-colors duration-150 focus:border-[rgba(124,58,237,0.6)] focus:ring-1 focus:ring-[rgba(124,58,237,0.6)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
            error ? "border-red-500/60 animate-pulse" : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
          }`}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8888a0]">
            <span className="text-[15px]">{suffix}</span>
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}
