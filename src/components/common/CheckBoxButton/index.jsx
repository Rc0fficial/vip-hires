import React, { useState } from "react";

const CheckboxButton = ({
  label,
  defaultSelected = false, // Default state
  onChange, // Callback for state changes
  className,
  disabled,
  icon,
  customStyles,
}) => {
  const [isSelected, setIsSelected] = useState(defaultSelected);

  const handleClick = () => {
    if (disabled) return; // Do nothing if disabled
    const newState = !isSelected;
    setIsSelected(newState); // Update internal state
    if (onChange) onChange(newState); // Notify parent of state change
  };

  return (
    <button
      className={`flex w-fit capitalize justify-center items-center rounded-full py-2 px-6 gap-3 ${
        isSelected
          ? "bg-green text-white" // Selected state
          : "border border-989 text-989" // Unselected state
      } ${className}`} // Allow additional custom classes
      onClick={handleClick}
      disabled={disabled}
      style={customStyles} // Allow custom inline styles
    >
      {icon && <span>{icon}</span>} {/* Render icon if provided */}
      {label}
    </button>
  );
};

export default CheckboxButton;