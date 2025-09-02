import React, { useState } from 'react';

export const SliderInput = ({ name, displayedLabel, minVal, maxVal }) => {
  const [sliderValue, setSliderValue] = useState(minVal);

  const handleSliderChange = e => {
    setSliderValue(e.target.value);
  };

  const handleInputChange = e => {
    const val = e.target.value;

    // Allow empty string to display in UI
    if (val === '' || val === '-') {
      setSliderValue(null);
      return;
    }

    const newValue = Math.max(minVal, Math.min(maxVal, val));
    setSliderValue(newValue);
  };

  return (
    <>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-emerald-700"
      >
        {displayedLabel}:
      </label>
      <div className="flex items-center gap-4">
        <input
          name={name}
          id={name}
          type="range"
          min={minVal}
          max={maxVal}
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full h-1 bg-emerald-700 rounded-lg range-lg appearance-none cursor-pointer"
        />
        <input
          type="number"
          value={sliderValue}
          min={minVal}
          max={maxVal}
          step="1"
          onChange={handleInputChange}
          required
          className="block w-20 px-3 py-2 text-sm border bg-gray-50 border-gray-300 rounded-md shadow-sm"
        />
      </div>
    </>
  );
};
